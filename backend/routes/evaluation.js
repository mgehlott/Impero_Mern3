const express = require('express');
const evaluationController = require('../controllers/evaluationController');
const router = express.Router();
router.post('/add', evaluationController.addEvaluation);
router.get('/', evaluationController.getEvaluation);
router.delete('/delete', evaluationController.deleteEvaluation);
module.exports = router;
