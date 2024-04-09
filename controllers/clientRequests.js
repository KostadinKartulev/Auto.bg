module.exports={
    async getPendingRequests(req, res) {
        const requests = await req.services.getAllServiceRequestsByUser(req.session.user.email);
        const pendingRequests = requests.filter((item) => {
            if (item.isProcessed == false) {
                return item;
            }
        })

        res.render('clientRequests', { title: 'Your Requests', requests: pendingRequests })
    },

    async getAcceptedRequests(req, res) {
        const requests = await req.services.getAllServiceRequestsByUser(req.session.user.email);
        const acceptedRequests = requests.filter((item) => {
            if (item.isAccepted == true && item.isFinished==false) {
                return item;
            }
        })

        res.render('clientRequests', { title: 'Your Requests', requests: acceptedRequests })
    },

    async getFinishedRequests(req, res) {
        const requests = await req.services.getAllServiceRequestsByUser(req.session.user.email);
        const finishedRequests = requests.filter((item) => {
            if (item.isFinished == true) {
                return item;
            }
        })

        res.render('clientRequests', { title: 'Your Requests', requests: finishedRequests })
    },
}