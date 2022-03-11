const express = require('express');

const login = require('./controllers/login');
const { create } = require('./controllers/userController');

const { emailValidation, passwordValidation } = require('./middlewares/loginValidations');

const { 
  validateDisplayName, 
  validateEmail, 
  validatePassword,
} = require('./middlewares/userValidations');

const verifyAuthToken = require('./middlewares/auth');

const loginRouter = express.Router();
const userRouter = express.Router();

loginRouter.post('/', emailValidation, passwordValidation, login);

userRouter.post('/', validateDisplayName, validateEmail, validatePassword, create);

module.exports = {
  loginRouter,
  userRouter,
};