module.exports = {
    deleteItemFromCart(req, res) {
        const id = req.params.id;
        req.session.cart = req.session.cart.filter(item => item.id !=id);
        res.redirect('/cart');
    }
}