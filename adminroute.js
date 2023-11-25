// authRouter.js
const express = require('express');
const router = express.Router();

// Import your controller
const adminController = require('../controller/admin');

// Define routes
router.get('/login_admin', adminController.showLogin);


// Add more routes as needed

module.exports = router;
