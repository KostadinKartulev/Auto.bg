module.exports = {
    get(req, res) {
        res.render('serviceRequestForm', { title: 'Service Request Form' });
    },

    async post(req, res) {
        const serviceRequest = {
            carModel: req.body.carModel,
            carYear: req.body.carYear,
            clientPhoneNumber: req.body.clientPhoneNumber,
            serviceType: req.body.serviceType,
        }

        try {
            await req.services.createServiceRequest(serviceRequest,req.session.user.email);
            res.redirect('/');
        } catch (error) {
            console.error(error.message);
            res.redirect('/serviceRequestForm');
        }
    }
}