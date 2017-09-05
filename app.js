const express = require('express');
const db = require('./db');
const userController = require('./user/user-controller');

const app = express();

app.use('/users', userController);

module.exports = app;
