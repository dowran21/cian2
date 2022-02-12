const nodemailer = require("nodemailer");
// const nodemailer = require('nodemailer');
  
  
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gamsyh2022@gmail.com',
        pass: 'Parola7cd4'
    }
});
  
let mailDetails = {
    from: 'gamysh2022@gmail.com',
    to: 'dovran@takyk.com',
    subject: 'Test mail',
    text: 'Node.js testing mail for GeeksforGeeks'
};
  
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
        console.log(err)
    } else {
        console.log('Email sent successfully');
    }
});
// sendMail()