import * as React from "react";
import { useState, useEffect } from "react";
import { SideBar } from "../SideBar/SideBar";
import { ChatArea } from "../ChatArea/ChatArea";

interface LayerProps {
  chats: any;
  user: any;
}

const Layer: React.FC<LayerProps> = ({ chats, user }) => {
  return (
    <div className="flex h-screen w-full">
      <SideBar chats={chats} user={user} />
      <ChatArea />
    </div>
  );
};

export default Layer;
