const express = require('express');
const Router = express.Router();
const {login, register} = require('../controllers/auth.controller.js');


Router.post('/login', login);
Router.post('/register', register);


module.exports = Router;