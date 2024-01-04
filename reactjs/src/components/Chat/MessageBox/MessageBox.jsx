import React, { useState } from "react";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { Box, InputBase } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";

export default function MessageBox({ sendMessage }) {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <Box className="flex justify-center items-center h-100 gap-2 px-3">
      <TagFacesIcon sx={{ color: "white" }} />
      <AttachFileIcon sx={{ color: "white" }} />
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          backgroundColor: "white",
          borderRadius: "10px",
          width: "100%",
          height: "70%",
          padding: "0px 15px",
        }}
        placeholder="Search..."
        inputProps={{ "aria-label": "search google maps" }}
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
      />
      <SendIcon
        sx={{ color: "white" }}
        onClick={() => {
          sendMessage(message);
          setMessage("");
        }}
      />
    </Box>
  );
}
