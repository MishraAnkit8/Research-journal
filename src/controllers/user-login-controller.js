const { redisClient } = require('../../config/redis');
const { serverFetch } = require('../../utils/fetchService');
const { setRedisData } = require('../../utils/redis.utils');
const { deleteRedisData } = require('../../utils/redis.utils');
const { sessionInfo } = require('../models/user-login-models');
const facultyServices = require('../services/user-login-service')
module.exports.renderUserRegistraion = async(req, res, next) => {
    const sessionid = req.cookies.session;
    console.log("sessionDataL::::::::", sessionid);

    if(sessionid){
        res.redirect('/dashboard');
    }else{
        res.render('user-login');
    }
    
    
}

module.exports.userLogOut= async(req, res, next) => {
try {
    const cookies = req.cookies;
    console.log('cookies ==>>>>>', cookies);
    const key = cookies.session;
    const userLogOutSession =  await deleteRedisData(`${key}:session`);
    
    console.log('userLogOutSession ====>>>>>>', userLogOutSession);
    const statusCode =  userLogOutSession.status === "Done" ? 200 : 500;
    if(userLogOutSession.status === "Done") {
        res.clearCookie('session');
        res.redirect('/user');

    }
    
} catch (error) {
    console.log("error logout : ",error);
    res.clearCookie('session');
    res.redirect('/user');
}
        
}

module.exports.loginFaculty = async (req, res, body) => {
    console.log("INSIDE:::::::");
    let {username, password} = req.body;
    console.log({username,password});

    let obj = {
        username,password,"rememberMe":false
    }
    console.log('obj ===>>>>>>>>', obj);

    try {
        
        const { status, headers, body }  = await serverFetch('https://portal.svkm.ac.in/api-gateway/auth/mobile/auth/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        });
        console.log('status , headers, body in controller ===>>>>',{
            status,
            headers,
            body
        });

        if(status == 200){

            let sessionId = await sessionInfo(username, headers.accesstoken, headers.refreshtoken, headers.devicetoken, headers.sessiontoken);
            
            const redisData = {
                username: username,
                accesstoken: headers.accesstoken,
                refreshtoken: headers.refreshtoken,
                devicetoken: headers.devicetoken,
                sessiontoken: headers.sessiontoken
            }

            setRedisData(`${sessionId}:session`, redisData)
            res.cookie('session', sessionId)
            if(sessionId){
                res.status(200).json({
                    "redirect" : 
                    "/dashboard"
                });
            } else {
                res.status(500).json({
                    message: "Internal Server Error!",
                    "redirect" : 
                    "/dashboard"
                })
            }

        }else{
            res.status(401).json({"redirect" : "/user-login", message: "Internal Server Error!"});
        }

      } catch (error) {
        console.log("ERROR : ",error);
        res.status(500).json({ error: error.message });
      }

}




