const express = require("express");
const { ValidateToken } = require("../Middlewares/Auth.middleware");
const { getUserDetails } = require("../Controllers/User.controllers");
const Router = express.Router();

Router.get("/", ValidateToken, getUserDetails);
Router.put("/", ValidateToken, getUserDetails);

module.exports = Router;