const jwt = require("jsonwebtoken");
const User = require("../Model/user.model");
const { mailOTP } = require("../Utils/EmailTransponder");

const register = async (req, res) => {
  try {
    const { name, email, username } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = new User({ name, email, username });
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating user" });
  }
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const OTP = Math.floor(1000 + Math.random() * 9000);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      // Set New OTP
      user.otp = OTP;
      //   Set Expiry Time
      const expirationTime = new Date();
      expirationTime.setMinutes(expirationTime.getMinutes() + 5);
      user.otpExpire = expirationTime;
      await user.save();

      // Send OTP through Email
      const OtpSent = await mailOTP(email, OTP);
      if (OtpSent) {
        return res.status(200).json({ message: "OTP sent Successfully" });
      } else {
        return res.status(500).json({ message: "Error sending OTP" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error sending OTP" });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, OTP } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.otp !== OTP) {
      return res.status(404).json({ message: "Invalid OTP" });
    }
    if (user.otpExpire < new Date()) {
      return res.status(404).json({ message: "OTP Expired" });
    }

    // Reset OTP
    // user.otp = 0;
    // user.otpExpire = null;
    // await user.save();

    // Send Token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict", // or "strict"
        secure: true, // Set to true if using HTTPS
        path: "/",
        domain: `${process.env.DOMAIN}`,
      })
      .send({ message: "OTP verified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error verifying OTP" });
  }
};

module.exports = { register, sendOTP, verifyOTP };
