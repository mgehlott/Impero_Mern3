const user = require('../models/User');
const jwt = require('jsonwebtoken');
const { checkPassword } = require('../utils/password');
const { validationResult, matchedData } = require('express-validator');
exports.login = async (req, res, next) => {
  const { email, password } = matchedData(req);
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    const err = new Error(errors.array()[0].msg);
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
