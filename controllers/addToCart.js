module.exports={
    async addToCart(req,res) {
        const id=req.params.id;
        const carPart=await req.services.getByIdCarPart(id);
        if (carPart) {
            carPart.count=1;
            req.session.cart.push(carPart);
            res.redirect('/');
        }else{
            res.redirect('404');
        }
    }
}