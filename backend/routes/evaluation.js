const express = require('express');
const evaluationController = require('../controllers/evaluationController');
const { body } = require('express-validator');
const router = express.Router();
router.post(
  '/add',
  [
    body('employeeId').trim().notEmpty().withMessage('Invalid Employee id'),
    body('percentage').trim().notEmpty().withMessage('Invalid Percent'),
    body('year').trim().notEmpty().withMessage('Invalid year'),
    body('salary').trim().notEmpty().withMessage('Invalid salary'),
    body('company').isObject().notEmpty().withMessage('Invalid company'),
    body('company.name')
      .trim()
      .notEmpty()
      .withMessage('Invalid name in company'),
    body('company.companyId')
      .trim()
      .notEmpty()
      .withMessage('Invalid company id'),
  ],
  evaluationController.addEvaluation
);
router.get('/', evaluationController.getEvaluation);
router.get('/years', evaluationController.getYearsRange);
router.put('/edit/:employeeId', evaluationController.editEvaluation);
router.delete('/delete', evaluationController.deleteEvaluation);
module.exports = router;
