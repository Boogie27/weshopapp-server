// To send email, install nodemail
// ******** LINK AT ***** https://www.npmjs.com/package/nodemailer
// To send HTML email template, install nodemailer-express-handlebars
// **** LINK AT ***** https://www.npmjs.com/package/nodemailer-express-handlebars
require('dotenv').config()



const SERVICE = process.env.SERVICE
const AUTH_EMAIL = process.env.AUTH_EMAIL
const AUTH_PASSWORD = process.env.AUTH_PASSWORD
const SENDER_EMAIL = process.env.SENDER_EMAIL
const APP_NAME_ONE = process.env.APP_NAME_ONE
const APP_NAME_TWO = process.env.APP_NAME_TWO



const path = require('path');
const nodemailer = require('nodemailer');
var handlebars = require('nodemailer-express-handlebars');
const { app_name } = require('./data')



// send email
const SendEmail = (email) => {
    const transporter = nodemailer.createTransport({
        service: SERVICE,
        auth: {
          user: AUTH_EMAIL,
          pass: AUTH_PASSWORD
        }
    });

    const options = {
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve('./message_template'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./message_template'),
        extName: '.handlebars',
    }

    //attach the plugin to the nodemailer transporter
    transporter.use('compile', handlebars(options));

    const mailOptions = {
        from: SENDER_EMAIL,
        to: email.to,
        subject: email.subject,
        template: email.template,
        context: {
            link: email.link,
            userName: email.userName,
            app_name1: APP_NAME_ONE,
            app_name2: APP_NAME_TWO,
        }
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return console.log(error);
        } else {
            return console.log('Email sent: ' + info.response);
        }
    });
}



module.exports = {
    SendEmail
}

