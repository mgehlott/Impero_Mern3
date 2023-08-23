const express = require('express');
const employeeController = require('../controllers/employeeController');
const { body } = require('express-validator');
const router = express.Router();
router.post(
  '/add',
  [
    body('company').trim().notEmpty().withMessage('Company is required'),
    body('name').trim().notEmpty().withMessage('Invalid name'),
    body('email').trim().isEmail().withMessage('Invalid email'),
    body('salary').notEmpty().withMessage('Invalid salary'),
    body('birthdate')
      .isDate({ format: 'YYYY-MM-DD' })
      .withMessage('Invalid Birth date'),
    body('joiningdate')
      .isDate({ format: 'YYYY-MM-DD' })
      .withMessage('Invalid joining date'),
  ],
  employeeController.addEmployee
);
router.get('/', employeeController.getEmployee);
router.put('/edit/:employeeId',employeeController.editEmployee);
router.delete('/delete/:employeeId', employeeController.deleteEmployee);
module.exports = router;
