module.exports={
    decreaseCount(req,res){
        const id=req.params.id;
        req.session.cart.map(product=>product.id==id? product.count<=1? product.count=1 : product.count-- : product.count=product.count);
        res.redirect('/cart');
    },
    
    increaseCount(req,res){
        const id=req.params.id;
        req.session.cart.map(product=>product.id==id? product.count++ : product.count=product.count);
        res.redirect('/cart');
    },


}
