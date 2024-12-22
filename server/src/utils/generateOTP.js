const otpGenerator = require("otp-generator");

function generateOTP() {
  return otpGenerator.generate(6, { upperCase: false, specialChars: false });
}

module.exports = generateOTP;
