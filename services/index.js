const { getAllCarParts, getByIdCarPart, createCarPart, updateByIdCarPart, deleteByIdCarPart, } = require('./carPart');
const { getAllOrders, getByIdOrder, createOrder, } = require('./order')
const { getAllUsers, deleteByIdUser, getAllServiceRequestsByUser } = require('./user')
const { register, login, logout, } = require('./auth');
const { getAllServiceRequest, getByIdServiceRequest, createServiceRequest, acceptByIdServiceRequest, finishByIdServiceRequest, rejectByIdServiceRequest } = require('./serviceRequest');

module.exports = () => (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
        res.locals.hasUser = true;
        res.locals.isAdmin = req.session.user.isAdmin;
        res.locals.isEmployee = req.session.user.isEmployee;
    }

    if (!req.session.cart) {
        req.session.cart = [];
    }

    req.services = {
        getAllCarParts,
        getByIdCarPart,
        createCarPart,
        updateByIdCarPart,
        deleteByIdCarPart,

        getAllOrders,
        getByIdOrder,
        createOrder,

        getAllUsers,
        deleteByIdUser,
        getAllServiceRequestsByUser,

        getAllServiceRequest,
        getByIdServiceRequest,
        createServiceRequest,
        acceptByIdServiceRequest,
        finishByIdServiceRequest,
        rejectByIdServiceRequest,

        register: (...params) => register(req.session, ...params),
        login: (...params) => login(req.session, ...params),
        logout: () => logout(req.session),
    }
    next()
}