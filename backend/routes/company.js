const express = require('express');
const companyController = require('../controllers/companyController');
const { body } = require('express-validator');
const router = express.Router();
router.get('/', companyController.getAllCompany);
router.post(
  '/add',
  body('name').trim().notEmpty().withMessage('Invalid company name'),
  companyController.addCompany
);
router.put(
  '/edit/:companyId',
  body('name').trim().notEmpty().withMessage('Invalid Company name'),
  companyController.editCompany
);
router.delete('/delete/:companyId', companyController.deleteCompany);

module.exports = router;
