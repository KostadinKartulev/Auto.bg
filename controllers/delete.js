module.exports={
    async get(req,res){
        const id=req.params.id;
        const carPart=await req.services.getByIdCarPart(id);
        
        if (carPart) {
            res.render('delete',{title:`Delete - ${carPart.name}`,carPart})
        }else{
            res.redirect('404')
        }
    },

    async post(req,res){
        const id=req.params.id;
        try {
            await req.services.deleteByIdCarPart(id);
            res.redirect('/');
        } catch (error) {
            console.error(error.message);
            res.redirect('404')
        }
    }

}