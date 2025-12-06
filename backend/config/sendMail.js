import {createTransport} from 'nodemailer';

const sendMail = async ({email, subject, html}) => {
    //console.log('Preparing to send email to', email);
    const transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        //secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject,
        html,
    });
};

export default sendMail;