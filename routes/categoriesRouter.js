const express = require('express');

const categoriesController = require('../controllers/categoriesController');

const { validateName } = require('../middlewares/categoriesValidations');
const { validateAuthToken } = require('../middlewares/auth');

const categoriesRouter = express.Router();

categoriesRouter.post('/', validateAuthToken, validateName, categoriesController.create);
categoriesRouter.get('/', validateAuthToken, categoriesController.listAll);

module.exports = categoriesRouter;
