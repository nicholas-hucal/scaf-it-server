const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/github', authController.connect);

router.get('/github/callback', authController.auth, authController.callback);

router.get('/profile', authController.getProfile);

router.get('/logout', authController.logout);

module.exports = router;