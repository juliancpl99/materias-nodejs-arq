const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys')

//initializations
const app = express(); //inicializa la app
require('./lib/passport');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); //dirname es la carpeta src, y se concatena con la carpeta views
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));//nombre del motor handlebars 

app.set('view engine', '.hbs'); //muestra hbs

//middlewares
app.use(session({
    secret: 'arquisessions',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database) //guarda sesion en la BD
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})) //acepta datos enviados desde un formulario
app.use(express.json()); //acepta archivos json
app.use(passport.initialize());
app.use(passport.session());

//global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success'); //guardar mensaje para usar en todas las vistas, llamada success
    app.locals.message = req.flash('message'); //mensaje normal en partials/message.hbs
    app.locals.user = req.user;
    next();
});

//routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/materias', require('./routes/materias'));

//public
app.use(express.static(path.join(__dirname, 'public')));

//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port'), app.get('port')
});