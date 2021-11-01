require('dotenv').config()
const database = require('../db/index.js');
const {status} = require('../utils/status.js')
const AdminHelper = require('../utils/index.js')

const OperatorLogin = async (req, res) =>{
    /********************
     {
         "phone":"61123141"
         "password":"61123141"
     }
     ************/
    const {phone, password} = req.body
    const query_text = `
        SELECT * FROM users u WHERE u.phone = $1 AND role_id = 2
    `
    try {
        const {rows} = await database.query(query_text, [phone])
        const user = rows[0]
        if(!user){
            const message = {type:"manual", name:"email", message:"'Email ' ýada 'Açar söz' ýalňyş"} 
            return res.status(status.notfound).json(message)
        }
        const is_password_same = await AdminHelper.ComparePassword(password, user.password)
        if (!is_password_same){
            const message = {type:"manual", name:"email", message:"'Email ' ýada 'Açar söz' ýalňyş"} 
            return res.status(status.bad).json(message)
        }
        const data = {"id":user.id, "phone":user.phone, "email":user.email, "role_id":user.role_id}
        const access_token = await AdminHelper.GenerateOperatorAccessToken(data)
        const refresh_token = await AdminHelper.GenerateOperatorRefreshToken(data)
        return res.status(status.success).json({"access_token":access_token, "refresh_token":refresh_token, "data":data})
    } catch (e) {
        console.log(e)
        return res.status(status.error).json({"message":"Operation wasn't succesfully"})
    }

}

const GetconfirmRealEstates = async (req, res) =>{
    dkjsjfn
}

const ActivateRealEstate = async (req, res) =>{

}

const NotActivatedEstates = async (req, res) =>{

}

const ConfirmVIP = async (req, res) =>{

}

module.exports = {
    OperatorLogin,
    ActivateRealEstate,
    NotActivatedEstates,
    ConfirmVIP,
    GetconfirmRealEstates
}