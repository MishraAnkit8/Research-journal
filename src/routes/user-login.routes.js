const express = require('express');
const userRegistrationController = require('../controllers/user-login-controller');
const { asyncErrorHandler } = require('../middleware/error.middleware');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', asyncErrorHandler(userRegistrationController.renderUserRegistraion));
router.post('/login' , asyncErrorHandler(userRegistrationController.loginFaculty));

//logout
router.get('/logout', asyncErrorHandler(userRegistrationController.userLogOut));

module.exports = router;