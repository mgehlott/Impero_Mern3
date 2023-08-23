const nodemailer = require('nodemailer');
exports.sendMail = ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  transporter
    .sendMail({
      from: 'mk@gmail.com',
      to: to,
      subject: subject,
      text: text,
      html: html,
    })
    .then((res) => console.log('Mail send'))
    .catch((err) => console.log(err));
};
