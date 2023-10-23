const express = require("express");
const { ValidateToken } = require("../Middlewares/Auth.middleware");
const { validateCreateGroup, validateGetAllMessage, validateAddUserToGroup, validateSendMessage } = require("../Middlewares/Chat.middleware");
const { createGroup, getAllMessage, addUserToGroup, sendMessage, getAllGroupforUser } = require("../Controllers/Chat.controller");

const Router = express.Router();

Router.post("/CreateGroup", [ValidateToken, validateCreateGroup], createGroup);
Router.post(
  "/GetAllMessage/:chatId",
  [ValidateToken, validateGetAllMessage],
  getAllMessage
);
Router.post(
  "/addUser",
  [ValidateToken, validateAddUserToGroup],
  addUserToGroup
);
Router.post("/sendMessage", [ValidateToken, validateSendMessage], sendMessage);
Router.get("/getAllGroup", ValidateToken, getAllGroupforUser);

module.exports = Router;
