module.exports = {
    get(req, res) {
        const totalPrice = req.session.cart.reduce((acc, current) => {
            return acc + (current.count * current.price);
        }, 0);
        req.session.cartTotalPrice=totalPrice;
        res.render('cart', { title: 'Shopping Cart', products: req.session.cart, totalPrice })
    }
}