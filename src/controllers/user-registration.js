
const facultyServices = require('../services/user-registration-service')
module.exports.renderUserRegistraion = async(req, res, next) => {
        res.render('user-registration-form.ejs' , {
        });
}


module.exports.loginFaculty = async (req, res, body) => {
    console.log('data coming from frontent end  in controller => ', req.body);

    const loginFacultyRequest = await facultyServices.facultyLoginRequest(req.body);

    console.log('loginFacultyRequest ====>>>>', loginFacultyRequest);

    const statusCode = loginFacultyRequest.status === "Done" ? 200 : (loginFacultyRequest.errorcode ? 400 : 500);
    res.status(statusCode).send({
        status : loginFacultyRequest.status,
        message : loginFacultyRequest.message,
        errorcode : loginFacultyRequest.errorcode ? loginFacultyRequest.errorcode : null
    })
}