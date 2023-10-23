const socketIo = require("socket.io");
const Message = require("../Model/message.model");
const { validateTokenSocketIO } = require("../Middlewares/Auth.middleware");

function initializeSocketServer(server) {
  const FRONTEND_URL = process.env.FRONTEND_URL;
  const io = socketIo(server, {
    cors: {
      origin: FRONTEND_URL.split(","), // Set to a specific origin in a production environment
      credentials: true,
      preflightContinue: false,
    },
  });

  const activeUsers = {}; // Store active users by socket ID

  io.use((socket, next) => {
    validateTokenSocketIO(socket, next);
  });

  io.on("connection", (socket) => {
    console.log("A user connected to the main socket.io");

    socket.on("disconnect", () => {
      console.log("A user disconnected from the general socket.io namespace");

      // Get the room information for the disconnecting user
      const room = getRoomForUser(socket.id);

      // Remove the disconnected user from the active users list
      delete activeUsers[socket.id];

      if (room) {
        generalNamespace
          .to(room)
          .emit("activeUsers", Object.values(activeUsers));
      }
    });
  });

  const generalNamespace = io.of("/wts/socket/sendMessage");

  generalNamespace.on("connection", (socket) => {
    console.log("A user connected to the whatsapp socket", socket.id);

    socket.on("joinRoom", async (room) => {
      socket.join(room);
      console.log("User joined room:", room);

      try {
        let userId = await validateTokenSocketIO(socket);
        const messages = await Message.find({ chatId: room }).populate({
          path: "userId",
          model: "User",
          select: "username about profilePic name",
        });

        if (messages) {
          socket.emit("getAllMessages", messages); // Send existing messages to the user
        }

        activeUsers[socket.id] = userId; // Add the user to the list of active users

        generalNamespace
          .to(room)
          .emit("activeUsers", Object.values(activeUsers));
      } catch (error) {
        console.error("Error joining room or fetching messages:", error);
        socket.emit(
          "error",
          "An error occurred while joining the room or fetching messages"
        );
      }
    });

    socket.on("message", async (room, message) => {
      try {
        let userId = await validateTokenSocketIO(socket);
        const newMessage = new Message({
          chatId: room,
          message,
          userId: userId,
        });
        // Save the message to the database
        await newMessage.save();

        // Retrieve the saved message with populated user information
        const savedMessage = await Message.findById(newMessage._id).populate({
          path: "userId",
          model: "User",
          select: "username about profilePic name",
        });

        // Emit the saved and populated message to all clients in the room
        generalNamespace.to(room).emit("message", savedMessage);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      delete activeUsers[socket.id];
    });
  });

  function getRoomForUser(socketId) {
    for (const room in io.sockets.adapter.rooms) {
      if (io.sockets.adapter.rooms[room].sockets[socketId]) {
        return room;
      }
    }
    return null;
  }

  return io;
}

module.exports = initializeSocketServer;
