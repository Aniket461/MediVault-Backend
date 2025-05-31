// routes/cdssRoutes.js
const express = require('express');
const router = express.Router();
const cdssController = require('../controllers/cdssController');


// @route   POST /api/cdss/diagnose
// @desc    Get diagnoses from AI based on input symptoms
router.post('/diagnose', cdssController.getAIDiagnoses);

module.exports = router;
 