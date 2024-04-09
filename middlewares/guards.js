function isNotLoggedIn() {
    return function (req, res, next) {
        if (!req.session.user) {
            next();
        } else {
            res.redirect('/')
        }
    }
}

function isLoggedIn() {
    return function (req, res, next) {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}

function isAdmin() {
    return function (req,res,next) {
        if (req.session.user && req.session.user.isAdmin===true) {
            next();
        }else {
            res.redirect('/login');
        }
    }
}

module.exports={
    isLoggedIn,
    isNotLoggedIn,
    isAdmin,
}