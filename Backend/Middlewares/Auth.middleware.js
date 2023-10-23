const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailRegex)) {
    return false;
  }
  return true;
};
const validateRegister = (req, res, next) => {
  const { name, email, username } = req.body;
  if (!name || !email || !username) {
    return res
      .status(400)
      .json({ message: "Name, Email and Username are required" });
  }
  // Validate Email
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid Email" });
  }
  next();
};

const validateSendOTP = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  // Validate Email
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid Email" });
  }
  next();
};

const validateVerifyOTP = (req, res, next) => {
  const { email, OTP } = req.body;
  if (!email || !OTP) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }
  // Validate Email
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid Email" });
  }
  next();
};

const ValidateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token Required" });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const validateTokenSocketIO = async (socket) => {
  const cookies = socket.handshake.headers.cookie;
  const parsedCookies = cookie.parse(cookies);

  // Extract the token from cookies
  const token = parsedCookies.token;
  console.log(token);
  if (!token) {
    return next(new Error("No token found"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded._id;
};

module.exports = {
  validateEmail,
  validateRegister,
  validateSendOTP,
  validateVerifyOTP,
  ValidateToken,
  validateTokenSocketIO,
};
