const express = require('express');

const login = require('./controllers/login');
const { create, listAll } = require('./controllers/userController');

const { emailValidation, passwordValidation } = require('./middlewares/loginValidations');

const { 
  validateDisplayName, 
  validateEmail, 
  validatePassword,
} = require('./middlewares/userValidations');

const { validateAuthToken } = require('./middlewares/auth');

const loginRouter = express.Router();
const userRouter = express.Router();

loginRouter.post('/', emailValidation, passwordValidation, login);

userRouter.post('/', validateDisplayName, validateEmail, validatePassword, create);
userRouter.get('/', validateAuthToken, listAll);

module.exports = {
  loginRouter,
  userRouter,
};