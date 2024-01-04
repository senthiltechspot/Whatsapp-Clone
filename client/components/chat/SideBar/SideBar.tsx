"use client";
import React, { useState } from "react";
import { SidebarHeader } from "./SidebarHeader";
import { SideBarChatList } from "./SideBarChatList";

interface SideBarProps {
  chats: any;
  user: any;
}

export const SideBar: React.FC<SideBarProps> = ({ chats, user }) => {
  const [hide, setHide] = useState(false);
  return (
    <div
      className={`sidebar ${
        hide ? "w-16 sm:w-16" : "w-96 sm:w-1/2 lg:w-1/3 fixed sm:relative"
      } bg-green-900 border-r-4 h-screen transition-all duration-500`}
    >
      <SidebarHeader hide={hide} setHide={setHide} />
      <SideBarChatList chats={chats} user={user} />
    </div>
  );
};
