const authService = require('../services/auth');

const validateAuthToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const user = await authService.verifyToken(authorization);

    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    req.id = user;

    next();
  } catch (err) {
    return res.status(500).end();
  }
};

module.exports = {
  validateAuthToken,
};
