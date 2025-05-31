const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
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
const upload = multer({ storage });

// @route   POST /api/records/upload
// @desc    Patients upload files
router.post('/upload', authMiddleware, roleMiddleware('patient'), upload.single('file'), recordController.uploadRecord);

// @route   GET /api/records/:patientId
// @desc    Doctor views a patient’s records
router.get('/:patientId', authMiddleware, roleMiddleware('doctor'), recordController.getPatientRecords);

module.exports = router;
