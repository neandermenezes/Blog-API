const express = require('express');

const postController = require('../controllers/postController');

const { 
  validateTitle, 
  validateContent, 
  validateCategories,
  validateId,
  validateUpdateBody,
  validateOwnership,
} = require('../middlewares/postValidations');
const { validateAuthToken } = require('../middlewares/auth');

const postRouter = express.Router();

postRouter.get('/search', validateAuthToken, postController.searchQuery);
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

module.exports = postRouter;
