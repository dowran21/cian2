require('dotenv').config()
const axios = require('axios');
 
const SendSMS = async({phone, message}) => {
    let tel_number = `${phone.replace('+', '')}`;
    try{
        await axios({
        method: 'post',
        url: process.env.API_PHONE_MESSAGE,
        data: {
            phone:tel_number,
            sms_message:message,
            service:"NB"
        }
        })
    }catch(err){
        // console.log(err)
    }
}
 
module.exports = {SendSMS};
