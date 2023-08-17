const express = require('express');
const employeeController = require('../controllers/employeeController');
const router = express.Router();
router.post('/add', employeeController.addEmployee);
router.get('/', employeeController.getEmployee);
router.put('/edit/:employeeId', employeeController.editEmployee);
router.delete('/delete/:employeeId', employeeController.deleteEmployee);
module.exports = router;
