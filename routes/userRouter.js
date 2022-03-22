const express = require('express');

const userController = require('../controllers/userController');

const { 
  validateDisplayName, 
  validateEmail, 
  validatePassword,
} = require('../middlewares/userValidations');
const { validateAuthToken } = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.post('/', validateDisplayName, validateEmail, validatePassword, userController.create);
userRouter.get('/', validateAuthToken, userController.listAll);
userRouter.get('/:id', validateAuthToken, userController.listById);
userRouter.delete('/me', validateAuthToken, userController.exclude);

module.exports = userRouter;
