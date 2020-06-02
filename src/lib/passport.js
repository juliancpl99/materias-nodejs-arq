const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if(rows.length > 0){ //si encontró el user en la BD
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);//si coinciden las pws
        if(validPassword){
            done(null, user, req.flash('success', 'Bienvenido ' + user.username));
        } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'El nombre de usuario no existe'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => { //done se utiliza para continuar cuando el proceso de autenticacion haya terminado
    const { fullname } = req.body
    const newUser = {
        username, // username: username, es lo mismo(se abrevia)
        password,
        fullname
    };
    newUser.password = await helpers.encryptPassword(password); //encripta la password
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId; //le agrega la id a newUser
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});