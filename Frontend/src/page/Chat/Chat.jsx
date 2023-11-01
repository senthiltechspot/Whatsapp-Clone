import React, { useEffect, useState } from "react";
import Layer from "../../components/Chat/Layer/Layer";
import { getAllGroupsForUserAPI, getUserDetails } from "../../api/chat.api";
import { Box } from "@mui/material";
import { getAllUser } from "../../api/users.api";

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState(null);
  const [currentUser, setCurrentUser] = useState();

  const fetchAllGroups = async () => {
    const res = await getAllGroupsForUserAPI();
    setChats(res);
  };
  //fetch userDetails

  const fetchAllUsers = async () => {
    const res = await getAllUser();
    setUsers(res);
  }

  useEffect(() => {
    const fetchuser = async () => {
      const res = await getUserDetails();
      setCurrentUser(res);
      if (!res) {
        console.log("error");
        window.location.href = "/";
      }
    };
    fetchuser();
    fetchAllGroups();
    fetchAllUsers();
  }, []);

  return (
    <>
      {chats && <Layer chats={chats} currentUser={currentUser}  users={users} fetchAllGroups={fetchAllGroups} />}
      {!chats && (
        <Box className="flex justify-center items-center h-screen w-full z-50">
          <h1 className="text-white">Loading Chats...</h1>
        </Box>
      )}
    </>
  );
}
