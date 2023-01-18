const nodemailer = require('nodemailer');






// send email
const SendEmail = (email) => {
    const mailOptions = {
        from: email.from,
        to: email.to,
        subject: email.subject,
        text: email.message
    };

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'anonyecharles@gmail.com',
          pass: 'ijxznuyrdpnwqbnn'
        }
    });

      
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






