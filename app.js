const express = require('express');
const db = require('./db');
const userController = require('./user/user-controller');
const authController = require('./auth/auth-controller');

const app = express();

app.use('/users', userController);
app.use('/auth', authController);

module.exports = app;
