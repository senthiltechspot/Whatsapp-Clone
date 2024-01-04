import React from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";
import { useSocket } from "@/components/context/Socket";

export const ChatArea = () => {
  const { currentChat, messages, user, sendMessage } = useSocket();
  if (!currentChat)
    return (
      <div className="chats w-full h-screen bg-green-900 flex items-center justify-center">
        <h1 className="text-center text-3xl font-bold text-white">
          Select a chat to start messaging
        </h1>
      </div>
    );
  return (
    <div className="chats w-full h-screen bg-green-900">
      <ChatHeader currentChat={currentChat} user={user} />
      <ChatMessages messages={messages} user={user} />
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};
