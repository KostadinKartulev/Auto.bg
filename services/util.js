const bcrypt=require('bcrypt');

function carPartViewModel(carPart) {
    return {
        id: carPart._id,
        name:carPart.name,
        description:carPart.description,
        imageUrl:carPart.imageUrl,
        price:carPart.price,
        category:carPart.category,
    }
}

function userViewModel(user) {
    const model= {
        id: user._id,
        email:user.email,
        username:user.username,
        isEmployee:user.isEmployee,
        isAdmin:user.isAdmin,
        serviceRequests:user.serviceRequests,
    }

    if (model.serviceRequests.length > 0 && model.serviceRequests[0].carModel) {
        model.serviceRequests = model.serviceRequests.map(serviceRequestViewModel);
    }

    return model;

}

function orderViewModel(order) {
    return {
        id: order._id,
        name:order.name,
        email:order.email,
        phoneNumber:order.phoneNumber,
        delivery:order.delivery,
        address:order.address,
        postalCode:order.postalCode,
        totalPrice:order.totalPrice,
        products:order.products,
    }
}

function serviceRequestViewModel(serviceRequest) {
    return {
        id: serviceRequest._id,
        carModel:serviceRequest.carModel,
        carYear:serviceRequest.carYear,
        serviceType:serviceRequest.serviceType,
        clientPhoneNumber:serviceRequest.clientPhoneNumber,
        dateToBringCar:serviceRequest.dateToBringCar,
        isFinished:serviceRequest.isFinished,
        isProcessed:serviceRequest.isProcessed,
        isAccepted:serviceRequest.isAccepted,
    }
}

async function comparePassword(password,hashedPassword) {
    return bcrypt.compare(password,hashedPassword);
}

async function hashPassword(password) {
    return bcrypt.hash(password,10);
}

module.exports={
    comparePassword,
    hashPassword,
    carPartViewModel,
    userViewModel,
    orderViewModel,
    serviceRequestViewModel,
}