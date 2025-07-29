const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/users/profile?email=...
router.get('/profile', userController.getProfile);

// PUT /api/users/profile
router.put('/profile', userController.updateProfile);

module.exports = router;
