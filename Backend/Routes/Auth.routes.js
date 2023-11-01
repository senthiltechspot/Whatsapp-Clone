const express = require("express");
const { validateRegister, validateSendOTP, validateVerifyOTP } = require("../Middlewares/Auth.middleware");
const { register, sendOTP, verifyOTP, logout } = require("../Controllers/Auth.controllers");

// router
const Router = express.Router();

Router.post("/register", [validateRegister], register);
Router.post("/sendOTP", [validateSendOTP], sendOTP);
Router.post("/verifyOTP", [validateVerifyOTP], verifyOTP);
Router.post("/logout", logout);

module.exports = Router;
