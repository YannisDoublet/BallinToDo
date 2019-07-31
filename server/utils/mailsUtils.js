const nodemailer = require('nodemailer');
const {email, password} = require('../config/mails_info');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password
    }
});

const validationOptions = (email, token) => {
    return {
        from: 'matcha.no.reply.42@gmail.com',
        to: email,
        subject: 'Welcome to To-do List !',
        html: '<p>Click <a href="http://localhost:3000/validate' + token + '">here</a> to validate your account !</p>'
    };
};

module.exports = {
    sendEmail: function(email, token) {
        transporter.sendMail(validationOptions(email, token));
    }
};