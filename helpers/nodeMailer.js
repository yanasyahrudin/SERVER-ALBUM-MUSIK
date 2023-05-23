const nodemailer = require('nodemailer');

function sendEmail(email, username) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yanna6710@gmail.com',
            pass: 'xekaerhhjobziqml',
        },
    });

    const options = {
        from: 'yanna6710@gmail.com',
        to: email,
        subject: 'Welcome to Album Musik',
        text: `Hello ${username},

        Welcome to Album Musik! We are thrilled to have you onboard. You now have full access to all the features and services available on our platform. With our application, you can buy Indonesian musicians and bands' music albums at our store. Get full access to all of our albums and services.

        Please don't hesitate to contact our team if you have any questions or issues while using our application. We are always ready to assist you.

        Once again, thank you for joining us. We hope you enjoy your experience using Album Musik.

        Best regards,
        The Album Musik Team`,
        html: `<body>
        <h1>Welcome to Album Musik!</h1>
        <p>Hello ${username},</p>
        <p>We are thrilled to have you onboard. You now have full access to all the features and services available on our platform. With our application, you can buy Indonesian musicians and bands' music albums at our store. Get full access to all of our albums and services.</p>
        <p>Please don't hesitate to contact our team if you have any questions or issues while using our application. We are always ready to assist you.</p>
        <p>Once again, thank you for joining us. We hope you enjoy your experience using Album Musik.</p>
        <p>Best regards,</p>
        <p>The Album Musik Team</p>
        <p><strong>The account on Album Musik has been created successfully</strong></p>
      </body>`,
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
