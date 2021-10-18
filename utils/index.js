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
    return JWT.sign(data, process.env.ACCESS_SECRET_KEY, {expiresIn:"10d"})
};

const GenerateUserRefreshToken = async(data) =>{
    return JWT.sign(data, process.env.REFRESH_SECRET_KEY, {expiresIn:"30d"})
};

const GenerateAdminAccessToken = async(data) =>{
    return JWT.sign(data, process.env.ADMIN_ACCESS_SECRET_KEY, {expiresIn:"1d"})
};

module.exports = {
    HashPassword,
    ComparePassword,
    GenerateUserAccessToken,
    GenerateUserRefreshToken,
    GenerateAdminAccessToken,
}