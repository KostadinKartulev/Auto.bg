module.exports={
    registerGet(req,res){
        res.render('register',{title:'Register'});
    },

   async registerPost(req,res){
        if (req.body.email=='' || req.body.username=='' || req.body.password=='') {
            return res.redirect('/register');
        }
        if (req.body.email.length<8 || req.body.username.length<3) {
            return res.redirect('/register');
        }
        if (req.body.password!=req.body.repeatPassword) {
            return res.redirect('/register');
        }

        try {
            await req.services.register(req.body.email,req.body.username,req.body.password);
            res.redirect('/');
        } catch (error) {
            console.error(error.message);
            res.redirect('/register');
        }
        
    },

    loginGet(req,res){
        res.render('login',{title:'Login'}); 
    },

    async loginPost(req,res){
        try {
            await req.services.login(req.body.email,req.body.password);
            res.redirect('/');
        } catch (error) {
            console.error(error.message);
            res.redirect('/login');
        }
        
    },

    logout(req,res){
        req.services.logout();
        res.redirect('/');
    }

}