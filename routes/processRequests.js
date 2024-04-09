const { getPendingRequests, getAcceptedRequests, getFinishedRequests, editGet, editPost, rejectRequest, finishedRequest } = require('../controllers/processRequests');

const router = require('express').Router();



router.get('/pending',getPendingRequests);
router.get('/accepted',getAcceptedRequests);
router.get('/finished',getFinishedRequests);

router.route('/editRequest/:id')
    .get(editGet)
    .post(editPost);

router.get('/rejectRequest/:id',rejectRequest);

router.get('/finishRequest/:id',finishedRequest);

module.exports=router;