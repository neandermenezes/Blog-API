const loginService = require('../services/login');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    const login = await loginService.login({ email, password });

    if (!login) return res.status(400).json({ message: 'Invalid fields' });

    return res.status(200).json({ message: login.token });
  } catch (err) {
    return err;
  }
};