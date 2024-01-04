"use client";
import {
  PersonalChat,
  getAllGroupsForUserAPI,
  getAllUsers,
  getUserDetails,
} from "@/api/chat.api";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { io } from "socket.io-client";
import { useAuth } from "./Auth";

type Message = {
  userId: string;
  userName: string;
  message: string;
};

type SocketContextType = {
  user: any;
  AllGroups: any[];
  sendMessage: (newMessage: any) => void;
  activeUsers: any[];
  messages: Message[];
  currentChat: any;
  setCurrentChat: React.Dispatch<React.SetStateAction<any>>;
  users: any;
  handleUserSelect: (user: any) => void;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL || "";
const socket = io(`${BASE_URL}/wts/socket/sendMessage`, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isLoggedIn } = useAuth();

  // Logged User Details
  const [user, setuser] = useState<any>(null);
  // All Chats and Group List for the logged User
  const [AllGroups, setAllGroups] = useState<any[]>([]);
  // Current Chat details
  const [currentChat, setCurrentChat] = useState<any>(null);
  // All Active Users for the current Chat
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  // All Messages for the current Chat
  const [messages, setMessages] = useState<Message[]>([
    {
      userId: "1",
      userName: "Whatsapp Bot",
      message: "No Message Found",
    },
  ]);
  // All Users for this app
  const [users, setUsers] = useState<any>([]);

  const fetchUserDetails = async () => {
    const res = await getUserDetails();
    setuser(res);
  };
  const fetchAllGroups = async () => {
    const res = await getAllGroupsForUserAPI();
    setAllGroups(res);
    // setCurrentChat(res[0]);
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
      fetchAllGroups();
      fetchUserDetails();
      fetchAllUsers();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const socket = io(`${BASE_URL}/wts/socket/sendMessage`, {
        withCredentials: true,
      });
      if (currentChat) {
        socket.on("connect", () => {
          socket.emit("joinRoom", currentChat._id);
          socket.emit("getAllMessages", currentChat._id);
        });

        socket.on("getAllMessages", (existingMessages: Message[]) => {
          if (existingMessages && existingMessages.length > 0) {
            setMessages(existingMessages);
          } else {
            setMessages([]);
          }
        });

        socket.on("message", (message: Message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.on("activeUsers", (users: any[]) => {
          setActiveUsers(users);
        });
      }

      return () => {
        socket.disconnect();
      };
    }
  }, [currentChat, isLoggedIn]);

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
    throw new Error("useSocket must be used within a LoadingProvider");
  }
  return context;
};
