const user = require('../models/User');
const jwt = require('jsonwebtoken');
const { checkPassword } = require('../utils/password');
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = new Error('Email or Password not provided');
    next(err);
    return;
  }
  try {
    const fetchedUser = await user.findOne({ email });
    if (fetchedUser) {
      const isPasswordSame = await checkPassword(
        password,
        fetchedUser.password
      );
      if (isPasswordSame) {
        const user = {
          name: fetchedUser.name,
          id: fetchedUser._id,
        };
        const token = await jwt.sign(
          {
            user,
          },
          process.env.PRIVATE_KEY
        );
        res.json({ token: token, user });
      } else {
        const err = new Error('Incorrect password');
        next(err);
      }
    } else {
      const err = new Error('Email is not registered');
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
