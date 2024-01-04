import {
  Box,
  Typography,
  createTheme,
  Paper,
  ListItem,
  ListItemText,
  List,
  Avatar,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/system";

const MessagesContainer = styled(Paper)(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  backgroundColor: "#D0F0C0",
}));

const MessageItem = styled(ListItem)(({ iscurrentuser }) => ({
  display: "flex",
  width: "fit-content",
  justifyContent: iscurrentuser ? "flex-end" : "flex-start",
  marginLeft: iscurrentuser ? "auto" : 1,
  maxWidth: "75%",
}));
const MessageText = styled(ListItemText)(({ iscurrentuser }) => ({
  wordBreak: "break-word",
  padding: "8px 12px",
  borderRadius: iscurrentuser ? "10px 0 10px 10px" : "0 10px 10px 10px",
  backgroundColor: iscurrentuser ? "#F4D03F" : "#FF3CAC",
  backgroundImage: iscurrentuser
    ? "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)"
    : " linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
  color: "white",
}));

const theme = createTheme();
export default function ChatBox({ messages, currentChat, currentUser }) {
  return (
    <MessagesContainer
      id="messages-container"
      sx={{ height: "79.8%", backgroundColor: "#D0F0C0" }}
    >
      <List>
        {messages &&
          currentChat &&
          messages.map((msg, index) => (
            <MessageItem
              key={index}
              alignItems="flex-start"
              iscurrentuser={msg.userId._id == currentUser._id ? true : false}
            >
              {msg.userId._id !== currentUser._id &&
                currentChat.isGroupChat && (
                  <Box className="pr-1 mt-1">
                    <Avatar
                      sx={{ width: 30, height: 30 }}
                      alt={msg.userId.username}
                      src={
                        msg.userId
                          ? msg.userId.profilePic
                          : "https://mui.com/static/images/avatar/1.jpg"
                      }
                    />
                  </Box>
                )}

              <MessageText
                primary={
                  msg.userId._id === currentUser._id
                    ? "You"
                    : msg.userId.username
                }
                secondary={msg.message}
                iscurrentuser={msg.userId._id === currentUser._id}
              />
            </MessageItem>
          ))}
      </List>
    </MessagesContainer>
  );
}
