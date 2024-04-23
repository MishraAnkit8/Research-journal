const { redisClient } = require('../../config/redis');
const { serverFetch } = require('../../utils/fetchService');
const { setRedisData } = require('../../utils/redis.utils');
const { sessionInfo } = require('../models/user-registration');
const facultyServices = require('../services/user-registration-service')
module.exports.renderUserRegistraion = async(req, res, next) => {
        res.render('user-registration-form.ejs' , {
        });
}


module.exports.loginFaculty = async (req, res, body) => {
    console.log("INSIDE:::::::");
    let {username, password} = req.body;
    console.log({username,password});

    let obj = {
        username,password,"rememberMe":false
    }

    try {
        
        const { status, headers, body }  = await serverFetch('https://portal.svkm.ac.in/api-gateway/auth/mobile/auth/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        });
        console.log({
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
                    message: "Internal Server Error!"
                })
            }

        }else{
            res.status(401).json({"redirect" : "/user-registration", message: "Internal Server Error!"});
        }

      } catch (error) {
        console.log("ERROR : ",error);
        res.status(500).json({ error: error.message });
      }



}