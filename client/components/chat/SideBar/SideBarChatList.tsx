import { useSocket } from "@/components/context/Socket";
import React from "react";

interface SideBarChatListProps {
  chats: any;
  user: any;
}
export const SideBarChatList: React.FC<SideBarChatListProps> = ({
  chats,
  user,
}) => {
  const { setCurrentChat, currentChat } = useSocket();
  return (
    <div className="w-full max-w-md bg-slate-950 overflow-y-scroll scrollbar-w-2 h-5/6 overflow-x-hidden">
      {/* <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Customers
        </h5>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View all
        </a>
      </div> */}
      <div className="flow-root">
        <ul role="list" className="divide-y bg-black-900">
          {chats.map((chat: any, index: number) => (
            <li
              key={index}
              onClick={() => setCurrentChat(chat)}
              className={`p-3 ${
                currentChat?._id === chat._id
                  ? "bg-gray-600 dark:bg-gray-600"
                  : ""
              } sm:py-4 hover:bg-zinc-600 `}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {chat.profileImg ? (
                    <img
                      className="w-8 h-8 rounded-full"
                      src={chat.profileImg}
                      alt="Neil image"
                    />
                  ) : (
                    <div className="rounded-full bg-gray-500 w-8 h-8 flex items-center justify-center">
                     <p className="text-white font-bold">
                       {chat.isGroupChat
                        ? chat.chatName[0]
                        : chat.users.filter(
                            (users: any) => users._id !== user._id
                          )[0].name[0]}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium truncate dark:text-white">
                    {chat.isGroupChat
                      ? chat.chatName
                      : chat.users.filter(
                          (users: any) => users._id !== user._id
                        )[0].name}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {chat.lastMessage}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-white">
                  {chat.time}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
