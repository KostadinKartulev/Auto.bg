const { getPendingRequests, getAcceptedRequests, getFinishedRequests, } = require('../controllers/clientRequests');

const router = require('express').Router();


router.get('/pending',getPendingRequests);
router.get('/accepted',getAcceptedRequests);
router.get('/finished',getFinishedRequests);

module.exports=router;