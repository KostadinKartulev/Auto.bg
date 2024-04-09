const User = require('../models/User');
const { userViewModel } = require('./util');

async function getAllUsers() {
    const users = await User.find({});
    return users.map(userViewModel);
}

async function deleteByIdUser(id) {
    await User.findByIdAndDelete(id);
}

async function getAllServiceRequestsByUser(email) {
    const user=await User.findOne({email}).populate('serviceRequests');
    const serviceRequests=userViewModel(user).serviceRequests;
    return serviceRequests;
}

module.exports={
    getAllUsers,
    deleteByIdUser,
    getAllServiceRequestsByUser,
}