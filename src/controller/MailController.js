const nodemailer = require('nodemailer');
const ConfigMail = require('../config/Config').ConfigMail;

let SendPassMail = function(UserName, EmailGetPass, PassWord) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
            user: ConfigMail.Email,
            pass: ConfigMail.PassWord
        }
    });
    var mailOptions = {
        from: ConfigMail.Email,
        to: EmailGetPass,
        subject: `Send password to user ${UserName}`,
        text: `Your password is ${PassWord}, please login againt and change password.`
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Message sent: ${info.response}`);
        };
    });

}

module.exports = {
    SendPassMail: SendPassMail
}