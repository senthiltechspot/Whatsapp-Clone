const nodemailer = require("nodemailer")

const mailOTP = async (email, OTP) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "OTP from WhatsApp Clone",
      text: `Your OTP is ${OTP} For Login to WhatsApp Clone`,
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { mailOTP };
