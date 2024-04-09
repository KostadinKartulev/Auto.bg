const User = require('../models/User');

async function register(session, email, username, password) {
    const existing = await User.findOne({ email });
    if (existing) {
        throw new Error('This email is already in use!');
    }
    const user = new User({
        email,
        username,
        hashedPassword: password,
    });
    await user.save();

    session.user = {
        id: user._id,
        email: user.email,
        username: user.username,
        isEmployee: user.isEmployee,
        isAdmin: user.isAdmin,
    };
}

async function login(session, email, password) {
    const user = await User.findOne({ email });
    if (user && await user.comparePassword(password)) {
        session.user = {
            id: user._id,
            email: user.email,
            username: user.username,
            isEmployee: user.isEmployee,
            isAdmin: user.isAdmin,
        }
    }else{
        throw new Error('Incorrect username or password');

    }
}

function logout(session) {
    delete session.user;
}

module.exports={
    register,
    login,
    logout,
}