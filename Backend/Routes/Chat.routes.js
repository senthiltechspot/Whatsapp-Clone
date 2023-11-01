const express = require("express");
const { ValidateToken } = require("../Middlewares/Auth.middleware");
const {
  validateCreateGroup,
  validateGetAllMessage,
  validateAddUserToGroup,
  validateSendMessage,
  validateCreatePersonalChat,
} = require("../Middlewares/Chat.middleware");
const {
  createGroup,
  getAllMessage,
  addUserToGroup,
  sendMessage,
  getAllGroupforUser,
  getAllUserInGroup,
  createPersonalChat,
  PersonalChat,
} = require("../Controllers/Chat.controller");

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
Router.get("/getAllUsersInGroup/:groupId", ValidateToken, getAllUserInGroup);
Router.post(
  "/startChat",
  [ValidateToken, validateCreatePersonalChat],
  createPersonalChat
);
Router.post("/personalChat/:id", ValidateToken, PersonalChat);

module.exports = Router;
