module.exports = {
    registerGet(req, res) {
        res.render('register', { title: 'Register' });
    },

    async registerPost(req, res) {
        if (req.body.email == '' || req.body.username == '' || req.body.password == '') {
            res.locals.errors = [{ msg: 'Всички полета трябва да се попълнят' }];

            return res.render('register', { title: 'Register' });
        }
        if (req.body.email.length < 8 || req.body.username.length < 3) {
            res.locals.errors = [{ msg: 'Имейла трябва да е поне 8 символа и името поне 3' }];

            return res.render('register', { title: 'Register' });
        }
        if (req.body.password != req.body.repeatPassword) {
            res.locals.errors = [{ msg: 'Паролата не отговаря на повторената парола' }];

            return res.render('register', { title: 'Register' });
        }

        try {
            await req.services.register(req.body.email, req.body.username, req.body.password);
            res.redirect('/');
        } catch (error) {
            res.locals.errors = [{ msg: error.message }];

            console.error(error.message);
            res.render('register', { title: 'Register' });
        }

    },

    loginGet(req, res) {
        res.render('login', { title: 'Login' });
    },

    async loginPost(req, res) {
        try {
            await req.services.login(req.body.email, req.body.password);
            res.redirect('/');
        } catch (error) {
            res.locals.errors = [{ msg: error.message }];

            console.error(error.message);
            res.render('login', { title: 'Login' });
        }

    },

    logout(req, res) {
        req.services.logout();
        res.redirect('/');
    }

}