module.exports={
    async details(req,res){
        const id=req.params.id;
        const carPart=await req.services.getByIdCarPart(id);

        if (req.session.cart.some(item=>item.id==id)) {
            res.locals.isInCart=true;
        }
        
        if (carPart) {
            res.render('details',{title:`${carPart.name} - Auto.bg`,carPart})
        }else{
            res.redirect('404');
        }
    }
}