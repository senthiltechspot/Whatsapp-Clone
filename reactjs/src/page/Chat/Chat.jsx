import React, { useEffect, useState } from "react";
import Layer from "../../components/Chat/Layer/Layer";
import { getAllGroupsForUserAPI, getUserDetails } from "../../api/chat.api";
import { Box } from "@mui/material";

export default function Chat() {
  const [chats, setChats] = useState(null);
  const [currentUser, setCurrentUser] = useState();

  const fetchAllUsers = async () => {
    const res = await getAllGroupsForUserAPI();
    setChats(res);
  };
  //fetch userDetails

  useEffect(() => {
    const fetchuser = async () => {
      const res = await getUserDetails();
      setCurrentUser(res);
      console.log(res);
      if (!res) {
        console.log("error");
        window.location.href = "/";
      }
    };
    fetchuser();
    fetchAllUsers();
  }, []);

  return (
    <>
      {chats && <Layer chats={chats} currentUser={currentUser} />}
      {!chats && (
        <Box className="flex justify-center items-center h-screen w-full z-50">
          <h1 className="text-white">Loading Chats...</h1>
        </Box>
      )}
    </>
  );
}
