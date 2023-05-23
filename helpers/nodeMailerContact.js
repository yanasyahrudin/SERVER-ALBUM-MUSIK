const nodemailer = require('nodemailer');

function sendEmail(name, email, message) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yanna6710@gmail.com',
            pass: 'xekaerhhjobziqml',
        },
    });

    const options = {
        from: email,
        to: 'yanna6710@gmail.com',
        subject: `I'm ${name} visitor from Album Musik`,
        text: message,
        html: message,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(options, (err, info) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log('Email sent: ' + info.response);
                resolve('success');
            }
        });
    });
}

module.exports = sendEmail;
