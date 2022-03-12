const express = require('express');

const login = require('./controllers/login');
const userController = require('./controllers/userController');
const categoriesController = require('./controllers/categoriesController');
const postController = require('./controllers/postController');

const { emailValidation, passwordValidation } = require('./middlewares/loginValidations');

const { 
  validateDisplayName, 
  validateEmail, 
  validatePassword,
} = require('./middlewares/userValidations');

const { validateName } = require('./middlewares/categoriesValidations');

const { 
  validateTitle, 
  validateContent, 
  validateCategories,
} = require('./middlewares/postValidations');

const { validateAuthToken } = require('./middlewares/auth');

const loginRouter = express.Router();
const userRouter = express.Router();
const categoriesRouter = express.Router();
const postRouter = express.Router();

loginRouter.post('/', emailValidation, passwordValidation, login);

userRouter.post('/', validateDisplayName, validateEmail, validatePassword, userController.create);
userRouter.get('/', validateAuthToken, userController.listAll);
userRouter.get('/:id', validateAuthToken, userController.listById);

categoriesRouter.post('/', validateAuthToken, validateName, categoriesController.create);
categoriesRouter.get('/', validateAuthToken, categoriesController.listAll);

postRouter.post(
  '/', validateAuthToken, validateTitle, validateContent, validateCategories, postController.create,
);

module.exports = {
  loginRouter,
  userRouter,
  categoriesRouter,
  postRouter,
};