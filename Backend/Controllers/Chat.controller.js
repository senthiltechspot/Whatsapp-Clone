const Chat = require("../Model/chat.model");
const Message = require("../Model/message.model");
const User = require("../Model/user.model");

const createGroup = async (req, res) => {
  try {
    const userID = req.user._id;
    const { chatName, users } = req.body;
    users.push(userID);
    const chat = await Chat.create({
      chatName,
      isGroupChat: true,
      users,
      groupAdmin: userID,
    });
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Error creating group chat " + error });
  }
};

const addUserToGroup = async (req, res) => {
  try {
    const userID = req.user._id;
    const { chatId, userId } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    if (chat.users.includes(userId)) {
      return res.status(400).json({ message: "User already in group" });
    }
    if (chat.groupAdmin.toString() !== userID) {
      return res
        .status(400)
        .json({ message: "Only admin can add user to group" });
    }
    chat.users.push(userId);
    await chat.save();
    return res.status(200).json(chat);
  } catch (error) {
    return res.status(500).json({ message: "Error adding user to group" });
  }
};

const getAllMessage = async (req, res) => {
  try {
    const userID = req.user._id;
    const { chatId } = req.params;

    // Check if chat exists
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    // if user is available in chat
    if (chat.users.includes(userID)) {
      // Get all messages
      const messages = await Message.find({ chatId });
      return res.status(200).json(messages);
    }
    // if User is admin of chat compare Object id
    else if (chat.groupAdmin.toString() === userID) {
      const messages = await Message.find({ chatId });
      return res.status(200).json(messages);
    }
    // if user is not available in chat
    else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting messages" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const userID = req.user._id;
    const { chatId, message } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    if (chat.users.includes(userID) || chat.groupAdmin.toString() === userID) {
      const newMessage = await Message.create({
        sender: userID,
        chatId,
        message,
      });
      await chat.save();
      return res.status(200).json(newMessage);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error sending message" });
  }
};

const getAllGroupforUser = async (req, res) => {
  try {
    const userID = req.user._id;
    const groups = await Chat.find({ users: userID }).populate({
      path: "users",
      select: "-otp -otpExpire",
    })
    return res.status(200).json(groups);
  } catch (error) {
    return res.status(500).json({ message: "Error getting groups" });
  }
};

const getAllUserInGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const groups = await Chat.findById(groupId).populate({
      path: "users",
      select: "-otp -otpExpire",
    });
    return res.status(200).json(groups);
  } catch (error) {
    return res.status(500).json({ message: "Error getting groups" });
  }
};

const createPersonalChat = async (req, res) => {
  try {
    const userID = req.user._id;
    const { userId } = req.body;
    const chat = await Chat.create({
      chatName: "Personal",
      isGroupChat: false,
      users: [userID, userId],
    });
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Error creating group chat " + error });
  }
};

const PersonalChat = async (req, res) => {
  try {
    const userID = req.user._id;
    const AnotherUserID = req.params.id;
    const user = await User.findById(AnotherUserID);
    const chat = await Chat.findOne({
      isGroupChat: false,
      users: {
        $all: [userID, AnotherUserID],
      },
    }).populate({
      path: "users",
      select: "-otp -otpExpire",
    })
    if (!chat) {
      const chat = await Chat.create({
        chatName: "Personal",
        isGroupChat: false,
        users: [userID, AnotherUserID],
      }).populate({
        path: "users",
        select: "-otp -otpExpire",
      })

      return res.status(201).json(chat);
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Error getting group chat" });
  }
};
module.exports = {
  createGroup,
  addUserToGroup,
  getAllMessage,
  sendMessage,
  getAllGroupforUser,
  getAllUserInGroup,
  createPersonalChat,
  PersonalChat,
};
