const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth'); //importa el metodo isloggedin de auth

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup')
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile', //si el usuario se autentica correctamente
    failureRedirect: '/signup',
    failureFlash: true //permite recibir mensajes Flash a passport
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut(); //cierra sesion de usuario
    res.redirect('/signin');
});

module.exports = router;