const express = require('express');
const companyController = require('../controllers/companyController');
const router = express.Router();
router.get('/', companyController.getAllCompany);
router.post('/add', companyController.addCompany);
router.put('/edit/:companyId', companyController.editCompany);
router.delete('/delete/:companyId', companyController.deleteCompany); 

module.exports = router;
