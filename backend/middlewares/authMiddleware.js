const jwt = require('jsonwebtoken');
const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    const token = authorization.split(' ')[1];
    try {
      const decoded = await jwt.verify(token, process.env.PRIVATE_KEY);
   
      req.user = decoded.user;
      next();
    } catch (error) {
      return res.status(400).json('invalid signature');
    }
  } else {
   return res.status(400).json('jwt not provided');
  }
};
module.exports = authMiddleware;
