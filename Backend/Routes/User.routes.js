const express = require("express");
const { ValidateToken } = require("../Middlewares/Auth.middleware");
const { getUserDetails, getAllUserDetails, UpdateUserDetails } = require("../Controllers/User.controllers");
const Router = express.Router();

Router.get("/", ValidateToken, getUserDetails);
Router.put("/", ValidateToken, UpdateUserDetails);
Router.get("/getAllUser", ValidateToken, getAllUserDetails);


module.exports = Router;