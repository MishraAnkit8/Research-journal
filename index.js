const router = require('express').Router();

const indexController = require('../controller/index');
router.get('/index',indexController.indexPage);

module.exports = router ;
