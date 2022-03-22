const express = require('express');

const login = require('../controllers/login');

const { emailValidation, passwordValidation } = require('../middlewares/loginValidations');

const loginRouter = express.Router();

loginRouter.post('/', emailValidation, passwordValidation, login);

module.exports = loginRouter;
