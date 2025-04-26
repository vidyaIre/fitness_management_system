const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// Set your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send OTP email
const sendOtpEmail = async (email, otp) => {
  const msg = {
    to: email, // recipient
    from: 'vidya.mazhuvanchery@gmail.com', // sender (must be verified in SendGrid)
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
    html: `<strong>Your OTP is: ${otp}</strong><br><br>It will expire in 5 minutes.`,
  };
console.log("Sending email.....");
  try {
    await sgMail.send(msg);
    console.log('Email sent to', email);
  } catch (error) {
    console.error('SendGrid Error:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw new Error('Failed to send email');
  }
};

module.exports = sendOtpEmail;
