const JWT = require ('jsonwebtoken')
require('dotenv').config()
const {status} = require ('../utils/status.js')

const VerifyAdminAccessToken = async (req, res, next) =>{
    let token = req.headers.authorization
    console.log()
    if (!token){
        return res.status(status.bad).send("Token not provided")
    }

    token = token.replace("Bearer ", "")
    JWT.verify(token, process.env.ADMIN_ACCESS_KEY, async (err, decoded) =>{
        if(err){
            console.log("I am in error")
            console.log(err)
            return res.status(status.forbidden).send("forbidden");
        }
        req.user = decoded;
        next()
    });
}

const VerifyUserAccessToken = async (req, res, next) =>{
    let token = req.headers.authorization
    console.log()
    if (!token){
        return res.status(status.bad).send("Token not provided")
    }

    token = token.replace("Bearer ", "")
    JWT.verify(token, process.env.USER_ACCESS_KEY, async (err, decoded) =>{
        if(err){
            console.log("I am in error")
            console.log(err)
            return res.status(status.forbidden).send("forbidden");
        }
        req.user = decoded;
        next()
    });
}
const VerifyCodeAccessToken = async (req, res, next) =>{
    let token = req.headers.authorization
    console.log()
    if (!token){
        return res.status(status.bad).send("Token not provided")
    }

    token = token.replace("Bearer ", "")
    JWT.verify(token, process.env.CODE_ACCESS_KEY, async (err, decoded) =>{
        if(err){
            console.log("I am in error")
            console.log(err)
            return res.status(status.forbidden).send("forbidden");
        }
        req.user = decoded;
        next()
    });
}

const VerifyOperatorAccessToken = async (req, res, next) =>{
    let token = req.headers.authorization
    console.log()
    if (!token){
        return res.status(status.bad).send("Token not provided")
    }

    token = token.replace("Bearer ", "")
    JWT.verify(token, process.env.OPERATOR_ACCESS_KEY, async (err, decoded) =>{
        if(err){
            console.log(err)
            return res.status(status.forbidden).send("forbidden");
        }
        req.user = decoded;
        next()
    });
}

const VerifyOperatorRefreshToken = async (req, res, next) =>{
    let token = req.headers.authorization
    console.log()
    if (!token){
        return res.status(status.bad).send("Token not provided")
    }

    token = token.replace("Bearer ", "")
    JWT.verify(token, process.env.OPERATOR_REFRESH_KEY, async (err, decoded) =>{
        if(err){
            console.log(err)
            return res.status(status.forbidden).send("forbidden");
        }
        req.user = decoded;
        next()
    });
}

module.exports = {
    VerifyAdminAccessToken,
    VerifyUserAccessToken,
    VerifyCodeAccessToken,
    VerifyOperatorRefreshToken,
    VerifyOperatorAccessToken
}