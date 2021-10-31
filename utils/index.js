const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
require('dotenv').config()

const HashPassword = async (password) => {
    return bcrypt.hashSync(password, 5);
};

const ComparePassword = async (password, hash) =>{
    return bcrypt.compareSync(password, hash)
};

const GenerateUserAccessToken = async(data) =>{
    return JWT.sign(data, process.env.USER_ACCESS_KEY, {expiresIn:"10d"})
};

const GenerateCodeAccessToken = async(data) =>{
    return JWT.sign(data, process.env.CODE_ACCESS_KEY, {expiresIn:"10m"})
}

const GenerateUserRefreshToken = async(data) =>{
    return JWT.sign(data, process.env.USER_REFRESH_KEY, {expiresIn:"30d"})
};

const GenerateAdminAccessToken = async(data) =>{
    return JWT.sign(data, process.env.ADMIN_ACCESS_KEY, {expiresIn:"1d"})
};
const GenerateAdminRefreshToken = async(data) =>{
    return JWT.sign(data, process.env.ADMIN_REFRESH_KEY, {expiresIn:"15d"})
};
module.exports = {
    HashPassword,
    ComparePassword,
    GenerateUserAccessToken,
    GenerateUserRefreshToken,
    GenerateAdminAccessToken,
    GenerateAdminRefreshToken,
    GenerateCodeAccessToken
}