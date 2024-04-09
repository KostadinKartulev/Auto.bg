module.exports={
    get(req,res){
        res.render('create',{title:'Create Car Part'});
    },

    async post(req,res){
        let carPart={
            name:req.body.name,
            description:req.body.description,
            imageUrl:req.body.imageUrl || undefined,
            price:Number(req.body.price),
            category:req.body.category,
        }
        try {
            await req.services.createCarPart(carPart);
            res.redirect('/');
        } catch (error) {
            console.log('Error creating record');
            console.error(error.message);
            res.redirect('/create');
        }
    },

}