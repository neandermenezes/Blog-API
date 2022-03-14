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
  validateId,
  validateUpdateBody,
  validateOwnership,
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
userRouter.delete('/me', validateAuthToken, userController.exclude);

categoriesRouter.post('/', validateAuthToken, validateName, categoriesController.create);
categoriesRouter.get('/', validateAuthToken, categoriesController.listAll);

postRouter.post(
  '/', validateAuthToken, validateTitle, validateContent, validateCategories, postController.create,
);
postRouter.get('/', validateAuthToken, postController.listAll);
postRouter.get('/:id', validateAuthToken, validateId, postController.listById);
postRouter.put(
  '/:id', 
  validateAuthToken, 
  validateUpdateBody, 
  validateOwnership, 
  validateTitle, 
  validateContent, 
  postController.update,
);
postRouter.delete('/:id', validateAuthToken, validateOwnership, postController.exclude);

module.exports = {
  loginRouter,
  userRouter,
  categoriesRouter,
  postRouter,
};