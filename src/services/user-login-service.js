
const facultyModels = require('../models/user-login-models');

const authorPassword = require('../../utils/auth');

module.exports.facultyLoginRequest = async (body) => {
    console.log('data in service ===>>>>>', body);
    const userDetails = body.userDetails;
    console.log('userDetails in service ====>>>>>>>', userDetails);
    const loginId = userDetails.loginId;
    // const facultyPassword = await authorPassword.hashPassword(userDetails.password);

    const facultyPassword = userDetails.password;
    console.log('facultyPassword =====>>>>>>>', facultyPassword);

    const facultLogin = await  facultyModels.loginRequest(loginId, facultyPassword);

    console.log('facultLogin ===>>>>>', facultLogin);

    return facultLogin.status === "Done" ? {
        status : facultLogin.status,
        message : facultLogin.message
    } : {
        status : facultLogin.status, 
        message : facultLogin.message,
        errorcode : facultLogin.errorcode

    }
}
