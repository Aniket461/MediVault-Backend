const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Admin-only access
router.get('/pending-users', authMiddleware, roleMiddleware('admin'), adminController.getPendingUsers);
router.patch('/user-status/:userId', authMiddleware, roleMiddleware('admin'), adminController.updateUserStatus);

module.exports = router;
