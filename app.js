const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const {logger, } = require('./src/middlewares/middlewares');
// index page router
const indexRouter = require('./src/routes/index');

// admin login form router
const adminLoginRouter = require('./src/routes/admin');
// adminDashboardRouter router
const adminDashboardRouter = require('./src/routes/adminDashboardRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));

// Use body-parser middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

// for views template engine 
app.set('view engine' , 'ejs');

app.set('views', path.join(__dirname, 'src', 'views'));

//for static file 
app.use(express.static(path.join(__dirname, 'src', 'public')));
// Make uses of router here
// index Router use
app.use(indexRouter);

// adminLoginFormRouter
app.use(adminLoginRouter);

//  adminDashboardRouter use
app.use(adminDashboardRouter);

app.listen(process.env.APP_PORT,(err)=>{
    if(err){
        console.log('somthis went wrong ', err);
        return err;
    }
    console.log(`server is running successfully at port ${process.env.APP_PORT}`);

});

