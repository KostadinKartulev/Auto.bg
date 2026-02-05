const { getPendingRequests, getAcceptedRequests, getRejectedRequests, getFinishedRequests, } = require('../controllers/clientRequests');

const router = require('express').Router();


router.get('/pending',getPendingRequests);
router.get('/accepted',getAcceptedRequests);
router.get('/rejected',getRejectedRequests);
router.get('/finished',getFinishedRequests);

module.exports=router;