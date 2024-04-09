module.exports = {
    get(req, res) {
        if (req.session.cart.length > 0) {
            res.render('purchaseInfo', { title: 'Purchase Information' });
        } else {
            res.redirect('/')
        }
    },

    async post(req, res) {
        if (req.session.cart.length > 0) {
            const order = {
                name: req.body.name,
                email: req.body.email,
                phoneNumber: Number(req.body.phoneNumber),
                delivery: req.body.delivery,
                address: req.body.address,
                postalCode: Number(req.body.postalCode),
                totalPrice: req.session.cartTotalPrice,
                products: req.session.cart,
            }

            try {
                await req.services.createOrder(order);
                delete req.session.cart;
                delete req.session.cartTotalPrice;
                res.redirect('/successfulOrder');
            } catch (error) {
                console.error(error.message);
                res.redirect('/');
            }
        }else {
            console.error('The shopping cart must have items in order to make a purchase');
            res.redirect('/');
        }
    }
}