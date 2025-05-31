const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const multer = require('multer');

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer();


// @route   POST /api/auth/signup
router.post('/signup',upload.single('file'), authController.signup);

// @route   POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;
