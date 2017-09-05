const express = require('express');
const morgan = require('morgan');
const db = require('./db');
const userController = require('./user/user-controller');
const authController = require('./auth/auth-controller');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
else {
    app.use(morgan('common'));
}

app.use('/users', userController);
app.use('/auth', authController);

module.exports = app;
