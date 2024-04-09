module.exports = {
    async getPendingRequests(req, res) {
        console.log('fdhdh');

        const requests = await req.services.getAllServiceRequest();
        console.log(requests);
        const pendingRequests = requests.filter((item) => {
            if (item.isProcessed == false) {
                return item;
            }
        })

        res.render('processRequests', { title: 'Process Requests', requests: pendingRequests })
    },

    async getAcceptedRequests(req, res) {
        const requests = await req.services.getAllServiceRequest();
        const acceptedRequests = requests.filter((item) => {
            if (item.isAccepted == true && item.isFinished==false) {
                return item;
            }
        })

        res.render('processRequests', { title: 'Process Requests', requests: acceptedRequests })
    },

    async getFinishedRequests(req, res) {
        const requests = await req.services.getAllServiceRequest();
        const finishedRequests = requests.filter((item) => {
            if (item.isFinished == true) {
                return item;
            }
        })

        res.render('processRequests', { title: 'Process Requests', requests: finishedRequests })
    },

    async rejectRequest(req, res) {
        const id = req.params.id;

        try {
            await req.services.rejectByIdServiceRequest(id);
            res.redirect('/processRequests/pending')
        } catch (error) {
            console.error(error.message);
            res.redirect('404')
        }
    },

    async finishedRequest(req, res) {
        const id = req.params.id;

        try {
            await req.services.finishByIdServiceRequest(id);
            res.redirect('/processRequests/accepted');
        } catch (error) {
            console.error(error.message);
            res.redirect('404')
        }
    },

    async editGet(req, res) {
        const id = req.params.id;
        const request = await req.services.getByIdServiceRequest(id);

        res.render('editServiceRequest', { title: 'Edit Request', request });
    },

    async editPost(req, res) {
        const id = req.params.id;

        const request = {
            dateToBringCar: req.body.dateToBringCar,
        }

        try {
            await req.services.acceptByIdServiceRequest(id, request);
            res.redirect('/processRequests/pending');
        } catch (error) {
            console.error(error.message);
            res.redirect('404')
        }

    },

}