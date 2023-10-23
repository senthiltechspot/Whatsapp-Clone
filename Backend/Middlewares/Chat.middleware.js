const validateCreateGroup = (req, res, next) => {
  const { chatName, users } = req.body;
  if (!chatName || !users) {
    return res
      .status(400)
      .json({ message: "Chat name and users are required" });
  }
  next();
};

const validateAddUserToGroup = (req, res, next) => {
  const { chatId, userId } = req.body;
  if (!chatId || !userId) {
    return res
      .status(400)
      .json({ message: "Chat id and user id are required" });
  }
  next();
};

const validateGetAllMessage = (req, res, next) => {
  const { chatId } = req.params;
  if (!chatId) {
    return res.status(400).json({ message: "Chat id is required" });
  }
  next();
};

const validateSendMessage = (req, res, next) => {
  const { chatId, message } = req.body;
  if (!chatId || !message) {
    return res
      .status(400)
      .json({ message: "Chat id and message are required" });
  }
  next();
};

module.exports = {
  validateCreateGroup,
  validateAddUserToGroup,
  validateGetAllMessage,
  validateSendMessage,
};
