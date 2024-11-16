require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const app = express();

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS   
  }
  });
const sendDynamicEmail = (recipientEmail, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,  
    to: recipientEmail,             
    subject: subject,               
    text: message                   
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email: ', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};


app.post('/send-verification-email', (req, res) => {
  const { recipientEmail, subject, message } = req.body;

 
  sendDynamicEmail(recipientEmail, subject, message);

  
  res.status(200).json({ message: 'Verification email sent successfully!' });
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
