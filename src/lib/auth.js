module.exports = {
    isLoggedIn(req, res, next) {
        if(req.isAuthenticated()){ //si user esta logeado
            return next(); //continue el codigo normal
        }
        return res.redirect('/signin'); //si no esta logeado, muestre signin
    },

    isNotLoggedIn(req, res, next) {
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    }
}