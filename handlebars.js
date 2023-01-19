// To send email, install nodemail
// ******** LINK AT ***** https://www.npmjs.com/package/nodemailer
// To send HTML email template, install nodemailer-express-handlebars
// **** LINK AT ***** https://www.npmjs.com/package/nodemailer-express-handlebars


const path = require('path');
const nodemailer = require('nodemailer');
var handlebars = require('nodemailer-express-handlebars');
const { app_name } = require('./data')



// send email
const SendEmail = (email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'anonyecharles@gmail.com',
          pass: 'ijxznuyrdpnwqbnn'
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
        from: email.from,
        to: email.to,
        subject: email.subject,
        template: email.template,
        context: {
            link: email.link,
            userName: email.userName,
            app_name1: app_name.app_name1,
            app_name2: app_name.app_name2,
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

