module.exports={
    async get(req,res){
        let users=await req.services.getAllUsers();
        res.render('users',{title:'Users',users});
    },

    async deleteUser(req,res){
        const id=req.params.id;
        await req.services.deleteByIdUser(id);
        res.redirect('/users');
    }
}