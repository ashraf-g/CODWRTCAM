const nodemailer = require("nodemailer");

require("dotenv").config();

// Create transporter using Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.sendVerificationEmail = async (email, token) => {
  // Define the email content
  const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `
      <p>Hello,</p>
      <p>Please verify your email by clicking on the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
    `,
  };
  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

exports.sendResetPasswordOtp = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <p>Hello,</p>
      <p>You requested a password reset. Your OTP is: <strong>${otp}</strong></p>
      <p>This OTP is valid for 10 minutes.</p>
    `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};
