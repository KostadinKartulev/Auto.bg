module.exports={
   async get(req,res){
        const id=req.params.id;
        const carPart=await req.services.getByIdCarPart(id);

        if (carPart) {
            return res.render('edit',{title:`Edit - ${carPart.name}`,carPart})
        }else{
            return res.redirect('404');
        }

    },
    async post(req,res){
        const id=req.params.id;
        const carPart={
            name:req.body.name,
            description:req.body.description,
            imageUrl:req.body.imageUrl,
            price:Number(req.body.price),
        }

        try {
            await req.services.updateByIdCarPart(id,carPart);
           return res.redirect('/');
        } catch (error) {
            console.error(error.message);
            return res.redirect('404');
        }
    }
}