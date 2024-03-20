"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./Auth";
import { getUserDetails, getAllGroupsForUserAPI, getAllUsers, PersonalChat } from "@/api/chat.api";

type Message = {
  userId: string;
  userName: string;
  message: string;
};

type SocketContextType = {
  user: any;
  AllGroups: any[];
  sendMessage: (newMessage: string) => void;
  activeUsers: any[];
  messages: Message[];
  currentChat: any;
  setCurrentChat: React.Dispatch<React.SetStateAction<any>>;
  users: any;
  handleUserSelect: (user: any) => void;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL || "";
let socket: Socket;

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  const [user, setUser] = useState<any>(null);
  const [AllGroups, setAllGroups] = useState<any[]>([]);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<any>([]);

  const fetchUserDetails = async () => {
    const res = await getUserDetails();
    setUser(res);
  };

  const fetchAllGroups = async () => {
    const res = await getAllGroupsForUserAPI();
    setAllGroups(res);
  };

  const fetchAllUsers = async () => {
    const res = await getAllUsers();
    setUsers(res);
  };

  const handleUserSelect = async (user: any) => {
    const data = await PersonalChat(user._id);
    setCurrentChat(data);
    fetchAllGroups();
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserDetails();
      fetchAllGroups();
      fetchAllUsers();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && currentChat) {
      socket = io(`${BASE_URL}/wts/socket/sendMessage`, {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd",
        },
      });

      socket.on("connect", () => {
        socket.emit("joinRoom", currentChat._id);
        socket.emit("getAllMessages", currentChat._id);
      });

      socket.on("getAllMessages", (existingMessages: Message[]) => {
        setMessages(existingMessages || []);
      });

      socket.on("message", (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on("activeUsers", (users: any[]) => {
        setActiveUsers(users || []);
      });

      return () => {
        socket.disconnect();
        socket.off("connect");
        socket.off("getAllMessages");
        socket.off("message");
        socket.off("activeUsers");
      };
    }
  }, [isLoggedIn, currentChat]);

  const sendMessage = (newMessage: string) => {
    if (newMessage && currentChat) {
      socket.emit("message", currentChat._id, newMessage);
    }
  };

  const contextValue: SocketContextType = {
    user,
    AllGroups,
    sendMessage,
    activeUsers,
    messages,
    currentChat,
    setCurrentChat,
    users,
    handleUserSelect,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
