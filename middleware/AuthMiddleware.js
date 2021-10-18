const JWT = require ('jsonwebtoken')
require('dotenv').config()
const {status} = require ('../utils/status.js')

const VerifyUserAccessToken = async (req, res, next) =>{
    let token = req.headers.authorization
    console.log()
    if (!token){
        return res.status(status.bad).send("Token not provided")
    }

    token = token.replace("Bearer ", "")
    JWT.verify(token, process.env.ACCESS_SECRET_KEY, async (err, decoded) =>{
        if(err){
            console.log("I am in error")
            console.log(err)
            return res.status(status.forbidden).send("forbidden");
        }
        req.user = decoded;
        next()
    });
}

module.exports = {
    VerifyUserAccessToken
}