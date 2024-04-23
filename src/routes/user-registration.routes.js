const express = require('express');
const userRegistrationController = require('../controllers/user-registration');
const { asyncErrorHandler } = require('../middleware/error.middleware');

const router = express.Router();

router.get('/', asyncErrorHandler(userRegistrationController.renderUserRegistraion));
router.post('/login', asyncErrorHandler(userRegistrationController.loginFaculty));

module.exports = router;