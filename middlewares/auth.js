const authService = require('../services/auth');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return req.status(401).json({ message: 'fill me pls' });
    }

    const user = authService.verifyToken(authorization);

    if (!user) {
      return res.status(401).json({ message: 'fill' });
    }

    req.email = user;
    next();
  } catch (err) {
    console.err(err);
    return res.status(500).end();
  }
};
