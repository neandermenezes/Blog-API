const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { emailValidation, passwordValidation } = require('./middlewares/loginValidations');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();

apiRoutes.post('/login', emailValidation, passwordValidation, routes.login);

app.use(apiRoutes);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});