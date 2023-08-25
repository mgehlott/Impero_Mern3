const express = require('express');
const companyController = require('../controllers/companyController');
const { body } = require('express-validator');
const multer = require('multer');
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.get('/', companyController.getAllCompany);
router.post(
  '/add',
  upload.single('img'),
  [
    body('name').trim().notEmpty().withMessage('Invalid company name'),
    body('address').trim().notEmpty().withMessage('Invalid address'),
    body('description').trim().notEmpty().withMessage('Invalid description'),
  ],
  companyController.addCompany
);
router.put(
  '/edit/:companyId',
  body('name').trim().notEmpty().withMessage('Invalid Company name'),
  companyController.editCompany
);
router.delete('/delete/:companyId', companyController.deleteCompany);
module.exports = router;
