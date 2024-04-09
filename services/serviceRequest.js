const ServiceRequest=require('../models/ServiceRequest');
const User = require('../models/User');
const {serviceRequestViewModel}=require('./util');

async function getAllServiceRequest() {
    const serviceRequests = await ServiceRequest.find({});
    return serviceRequests.map(serviceRequestViewModel);
}

async function getByIdServiceRequest(id) {
    const serviceRequest = await ServiceRequest.findById(id);
    if (serviceRequest) {
        return serviceRequestViewModel(serviceRequest);
    } else {
        return undefined;
    }
}

async function createServiceRequest(serviceRequest,email) {
    const result=new ServiceRequest(serviceRequest);
    await result.save();

    const user=await User.findOne({email});
    user.serviceRequests.push(result._id);
    await user.save();
}


async function acceptByIdServiceRequest(id,serviceRequest) {
    const existing=await ServiceRequest.findById(id);

    existing.dateToBringCar=serviceRequest.dateToBringCar;
    existing.isProcessed=true;
    existing.isAccepted=true;

    await existing.save();
}

async function finishByIdServiceRequest(id) {
    const existing=await ServiceRequest.findById(id);

    existing.isFinished=true;

    await existing.save();
}

async function rejectByIdServiceRequest(id) {
    const existing=await ServiceRequest.findById(id);

    existing.isProcessed=true;
    existing.isAccepted=false;

    await existing.save();
}

module.exports={
    getAllServiceRequest,
    getByIdServiceRequest,
    createServiceRequest,
    acceptByIdServiceRequest,
    finishByIdServiceRequest,
    rejectByIdServiceRequest,
}