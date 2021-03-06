require('dotenv').config();
const express = require('express');
const app = express();
const usersRouter = require('./routes/users.router');
const productsRouter = require('./routes/products.router');
const ordersRouter = require('./routes/orders.router');
const categoriesRouter = require('./routes/categories.router');
const serviceLocator = require('./services/service.locator');
const authRouter = require('./routes/auth.router');
const bodyParser = require("body-parser");
const passport = require('./autch/passport');
const authMiddleware = require('./autch/authMiddleware');


serviceLocator.register('db', require('knex')({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    searchPath: ['knex', 'public'],
}));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(authMiddleware);
app.use('/', authRouter );
app.use('/orders', ordersRouter);
app.use("/users", usersRouter);
app.use('/products',productsRouter);
app.use('/categories', categoriesRouter);


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({'errors': {
            message: err.message,
            error: {}
        }});
});



app.listen(process.env.APP_PORT, () => console.log(`API listening on port ${process.env.APP_PORT}!`));
