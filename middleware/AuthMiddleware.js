const JWT = require ('jsonwebtoken')
require('dotenv').config()
const {status} = require ('../utils/status.js')
const database = require('../db/index.js')


const VerifyAdminAccessToken = async (req, res, next) =>{
    let token = req.headers.authorization
    // console.log(token)
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

const VerifyAdminRefreshToken = async (req, res, next) =>{
    let token = req.headers.authorization
    if (!token){
        return res.status(status.bad).send("Token not provided")
    }

    token = token.replace("Bearer ", "")
    JWT.verify(token, process.env.ADMIN_REFRESH_KEY, async (err, decoded) =>{
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
    // console.log(req)
    if (!token){
        return res.status(450).send("Token not provided")
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

const VerifyUserRefreshToken = async (req, res, next) =>{
    let token = req.headers.authorization
    if (!token){
        return res.status(status.bad).send("Token not provided")
    }

    token = token.replace("Bearer ", "")
    JWT.verify(token, process.env.USER_REFRESH_KEY, async (err, decoded) =>{
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

const VerifyIsAdmin = async (req, res, next) =>{
    role_id = req.user.role_id;
    if(role_id == 1){
        next()
    }else{
        return res.status(status.forbidden).send("forbidden");
    }
}

const VerifyEstateUser = async (req, res, next) =>{
    console.log("hello i am in verifyestate user")
    const {id} = req.params
    const user_id = req.user.id
    console.log(req.files)
    const query_text = `
        SELECT id FROM real_estates re 
            WHERE re.id = $1 AND user_id = $2
    `
    try{
        const {rows} = await database.query(query_text, [id, user_id])
        if (rows){
            console.log("I passed verify of real_estate_user_verification")
            next ()
        }
        else {
            return res.status(444).json({"message":"It isn't your real estate"})
        }
    }catch(e){
        console.log(e)
        return res.status(500).json({"message":"bad error"})
    }
}

module.exports = {
    VerifyAdminAccessToken,
    VerifyUserAccessToken,
    VerifyUserRefreshToken,
    VerifyCodeAccessToken,
    VerifyOperatorRefreshToken,
    VerifyOperatorAccessToken,
    VerifyAdminRefreshToken,
    VerifyIsAdmin,
    VerifyEstateUser
}