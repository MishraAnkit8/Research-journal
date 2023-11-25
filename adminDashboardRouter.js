const adminDashboardRouter = require('express').Router();
const adminDashboardController = require('../controller/adminDashboardController');

adminDashboardRouter.get('/adminDashboard', adminDashboardController.adminDashboard);

module.exports = adminDashboardRouter;
