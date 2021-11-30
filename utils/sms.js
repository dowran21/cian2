require('dotenv').config()
const axios = require('axios');
 
const SendSMS = async({phone, message}) => {
    let tel_number = `${phone.replace('+', '')}`;
    console.log(phone, message)
    try{
        await axios({
        method: 'post',
        url: `http://109.106.244.215:5004/send-sms`,
        data: {
            phone:tel_number,
            sms_message:message,
            service:"CIAN"
        }
        })
    }catch(err){
        // console.log(err)
    }
}
 
module.exports = {SendSMS};
