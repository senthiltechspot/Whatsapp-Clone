const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const http = require("http");

const authRoutes = require("./Routes/Auth.routes");
const chatRoutes = require("./Routes/Chat.routes");
const userRoutes = require("./Routes/User.routes");

const connectDB = require("./Configs/Database");

const cors = require("cors");
const initializeSocketServer = require("./Utils/Socket");

const app = express();
app.use(cookieParser());

const FRONTEND_URL = process.env.FRONTEND_URL;
const corsOptions = {
  origin: FRONTEND_URL.split(","),
  credentials: true,
  preflightContinue: false,
};
app.use(cors(corsOptions));
app.use(express.json());
connectDB();

// Home Route
app.get("/", (req, res) => {
  return res.send("API is running");
});

// Create an HTTP server using your Express app
const server = http.createServer(app);

// Initialize socket.io on the server using the module
const io = initializeSocketServer(server, app);

// Routes
app.use("/wts/v1/api/auth", authRoutes);
app.use("/wts/v1/api/chat", chatRoutes);
app.use("/wts/v1/api/user", userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
