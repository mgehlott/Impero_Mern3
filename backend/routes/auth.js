const express = require('express');
const { login, employeeLogin } = require('../controllers/authController');
const { body } = require('express-validator');
const router = express.Router();
router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Invalid Email'),
    body('password')
      .trim()
      .isLength({ min: 4 })
      .withMessage('Please enter a valid password'),
  ],
  login
);
router.post(
  '/employee-login',
  [
    body('email').trim().isEmail().withMessage('Invalid Email'),
    body('password')
      .trim()
      .isLength({ min: 4 })
      .withMessage('Please enter a valid password'),
  ],
  employeeLogin
);
module.exports = router;
