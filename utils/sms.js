require('dotenv').config()
const axios = require('axios');
 
const SendSMS = async({phone, message}) => {
    let tel_number = `${phone.replace('+', '')}`;
    console.log(phone, message)
    try{
        await axios({
        method: 'post',
        url: `http://141.136.44.174:3333/send-sms/to/service/gamysh`,
        data: {
            to:`+993${phone}`,
            message,
            
        }
        })
    }catch(err){
        // console.log(err)
    }
}
 
module.exports = {SendSMS};