const database = require ("../db/index.js")
const {status} = require('../utils/status')
const UserHelper = require('../utils/index.js')

const UserRegistration = async (req, res) =>{
    const {full_name, password, email, phone} = req.body;
    const hashedPassword = await UserHelper.HashPassword(password)
    const query_text = `
        INSERT INTO users (full_name, password, email, phone, role_id) VALUES
        ('${full_name}', '${hashedPassword}', ${email ? `${email}`:'null'}, '${phone}', 2) RETURNING *
    `
    try {
        const {rows} = await database.query(query_text, [])
        const data = {id:rows[0].id, full_name:rows[0].full_name, email:rows[0].email, phone:rows[0].phone}
        const token = await UserHelper.GenerateUserAccessToken(data)
        const refresh_token = await UserHelper.GenerateUserRefreshToken(data)
        return res.status(status.success).json({token, refresh_token, data})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const UserLogin = async (req, res) =>{
    const {phone, password} = req.body;
    const query_text = `
        SELECT * FROM users WHERE phone = '${phone}'
    `
    try {
        const {rows} = await database.query(query_text, []);
        const user = rows[0];
        if(!user){
            let message = {}
            message["phone"] = "Телефон или пароль неправильный"
            return res.status(status.error).send({error:message})
        }
        const compare = await UserHelper.ComparePassword(password, user?.password)
        if(!compare){
            let message = {}
            message["phone"] = "Телефон или пароль неправильный"
            return res.status(status.error).send({error:message})
        }
        const data = {id:user.id, full_name:user.full_name, email:user.email, phone:user.phone}
        const token = await UserHelper.GenerateUserAccessToken(data)
        const refresh_token = await UserHelper.GenerateUserRefreshToken(data)
        return res.status(status.success).json({token, refresh_token, data})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send("Неизвестная ошибка")   
    }   
}

module.exports = {
    UserRegistration,
    UserLogin
}