const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');

const initDb = require('./models');
const Services = require('./services/index');

const { isAdmin, isLoggedIn, isNotLoggedIn, isAdminOrEmployee } = require('./middlewares/guards');
const { notFound } = require('./controllers/notFound');
const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const { details } = require('./controllers/details');
const create = require('./controllers/create');
const deleteCarPart = require('./controllers/delete');
const edit = require('./controllers/edit');
const { registerGet, registerPost, loginGet, loginPost, logout } = require('./controllers/auth');
const { addToCart } = require('./controllers/addToCart');
const { increaseCount, decreaseCount } = require('./controllers/productCount');
const cart = require('./controllers/cart');
const { deleteItemFromCart } = require('./controllers/deleteFromCart');
const purchaseInfo = require('./controllers/purchaseInfo');
const { successfulOrder } = require('./controllers/successfulOrder');
const users = require('./controllers/users');
const serviceRequestForm = require('./controllers/serviceRequestForm');

const processRequestsRouter = require('./routes/processRequests');
const clientRequestsRouter = require('./routes/clientRequests');

start();

async function start() {

    await initDb();

    const app = express();

    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);
    app.set('view engine', 'hbs');

    app.use(session({
        secret: 'my super secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' },
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(Services())

    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details)

    app.route('/create')
        .get(isAdmin(), create.get)
        .post(isAdmin(), create.post);

    app.route('/delete/:id')
        .get(isAdmin(), deleteCarPart.get)
        .post(isAdmin(), deleteCarPart.post);

    app.route('/edit/:id')
        .get(isAdmin(), edit.get)
        .post(isAdmin(), edit.post);

    app.route('/register')
        .get(isNotLoggedIn(), registerGet)
        .post(isNotLoggedIn(), registerPost);

    app.route('/login')
        .get(isNotLoggedIn(), loginGet)
        .post(isNotLoggedIn(), loginPost);

    app.get('/logout', isLoggedIn(), logout)

    app.route('/cart')
        .get(cart.get)

    app.get('/addToCart/:id', addToCart)
    app.get('/increaseCount/:id', increaseCount)
    app.get('/decreaseCount/:id', decreaseCount)
    app.get('/deleteItemFromCart/:id', deleteItemFromCart)

    app.route('/purchaseInfo')
        .get(purchaseInfo.get)
        .post(purchaseInfo.post)

    app.get('/successfulOrder', successfulOrder);

    app.get('/users', isAdmin(), users.get);
    app.get('/deleteUser/:id', isAdmin(), users.deleteUser);

    app.route('/serviceRequestForm')
        .get(isLoggedIn(), serviceRequestForm.get)
        .post(isLoggedIn(), serviceRequestForm.post);

    app.use('/processRequests', isAdminOrEmployee(), processRequestsRouter);

    app.use('/clientRequests', isLoggedIn(), clientRequestsRouter);

    app.all('*', notFound);

    app.listen(3000, () => console.log('Server started on port 3000'));
}