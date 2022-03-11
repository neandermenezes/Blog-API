const { Users } = require('../models');

const validateDisplayName = (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res
      .status(400)
      .json({
        message: '"displayName" length must be at least 8 characters long',
      });
  }

  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;

  if (!email) return res.status(400).json({ message: '"email" is required' });

  if (!regex.test(email)) { 
    return res.status(400).json({ message: '"email" must be a valid email' }); 
  }

  const user = await Users.findOne({ where: { email } });

  if (user) return res.status(409).json({ message: 'User already registered' });

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: '"password" is required' });

  if (password.length !== 6) {
  return res.status(400)
    .json({ message: '"password" length must be 6 characters long' }); 
  }

  if (!password) return res.status(400).json({ message: '"password" is required' });

  next();
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
};
