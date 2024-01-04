import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar, Badge } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import MessageBox from "../MessageBox/MessageBox";
import ChatBox from "../ChatBox/ChatBox";
import { useState } from "react";
import { io } from "socket.io-client";
import { useEffect } from "react";

const drawerWidth = 340;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "rgb(32, 44, 51)",
  color: "white",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: "rgb(32, 44, 51)",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "rgb(32, 44, 51)",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "rgb(32, 44, 51)",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

const socket = io(`${VITE_BASE_URL}/wts/socket/sendMessage`, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});
export default function Layer({ chats, currentUser }) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [messages, setMessages] = useState([
    {
      userId: "1",
      userName: "Whatsapp Bot",
      message: "No Message Found",
    },
  ]);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const socket = io(`${VITE_BASE_URL}/wts/socket/sendMessage`, {
      withCredentials: true,
    });

    if (currentChat) {
      socket.on("connect", () => {
        // Join the chat room and get existing messages when the socket is connected
        socket.emit("joinRoom", currentChat._id);
        socket.emit("getAllMessages", currentChat._id);
      });

      socket.on("getAllMessages", (existingMessages) => {
        if (existingMessages && existingMessages.length > 0) {
          setMessages(existingMessages);
        } else {
          setMessages([]);
        }
      });

      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on("activeUsers", (users) => {
        setActiveUsers(users);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [currentChat]);

  const sendMessage = (newMessage) => {
    if (newMessage) {
      socket.emit("message", currentChat._id, newMessage);
    }
  };

  const scrollToBottom = () => {
    const messagesContainer = document.getElementById("messages-container");
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        {currentChat && (
          <Toolbar className="bg-emerald-900">
            <IconButton
              color="white"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                color: "white",
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box className="flex items-center gap-3">
              <Badge
                color="success"
                variant="standard"
                overlap="circular"
                size="small"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="https://mui.com/static/images/avatar/1.jpg"
                />
              </Badge>
              <Typography variant="h6" noWrap component="div">
                {currentChat ? currentChat.chatName : "Chat"}
              </Typography>
            </Box>
          </Toolbar>
        )}
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader className="sticky top-0 bg-emerald-900 z-50">
          <Box className="flex justify-around items-center w-100">
            {open && (
              <>
                <Avatar
                  alt="Remy Sharp"
                  src="https://mui.com/static/images/avatar/1.jpg"
                />
                <Typography variant="h7" noWrap component="div">
                  {currentUser ? currentUser.name : "Loading...."}
                </Typography>
              </>
            )}
            <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </Box>
        </DrawerHeader>
        <Divider sx={{ bgcolor: "white" }} />
        {open && <SearchBar />}
        <List sx={{ width: "300px" }}>
          {chats &&
            chats.map((chat, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: "block", cursor: "pointer" }}
                onClick={() => {
                  setCurrentChat(chat);
                  setMessages([]);
                }}
              >
                <Box className="flex items-center justify-between p-1">
                  <Box className="flex items-center gap-3">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://mui.com/static/images/avatar/1.jpg"
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box>
                      <ListItemText
                        primary={chat.chatName}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {chat.chatName}
                      </Typography>
                    </Box>
                  </Box>
                  <Badge color="success" badgeContent={4} />
                </Box>
                <Divider sx={{ bgcolor: "white", width: "340px" }} />
              </ListItem>
            ))}
        </List>

        <Divider />
      </Drawer>
      {currentChat ? (
        <Box component="main" sx={{ flexGrow: 1, height: "100vh" }}>
          <DrawerHeader />
          <ChatBox
            messages={messages}
            currentChat={currentChat}
            currentUser={currentUser}
            activeUsers={activeUsers}
          />
          <Box
            className="sticky bottom-0 bg-emerald-900"
            sx={{ height: "70px" }}
          >
            <MessageBox sendMessage={sendMessage} currentChat={currentChat} />
          </Box>
        </Box>
      ) : (
        <Box
          component="main"
          className="flex justify-center items-center"
          sx={{ flexGrow: 1, height: "100vh" }}
        >
          Select any chat to start messaging
          <br />
          or create a new chat
        </Box>
      )}
    </Box>
  );
}
