import React from "react";

interface ChatHeaderProps {
  currentChat: any;
  user: any;
}
export const ChatHeader: React.FC<ChatHeaderProps> = ({
  currentChat,
  user,
}) => {
  console.log(
    currentChat?.users.filter((users: any) => users._id !== user._id)[0].name
  );
  return (
    <div
      className="flex flex-row items-center p-3 border-b-2 border-gray-200 rounded-t-lg bg-green-900"
      style={{ height: "10%" }}
    >
      {currentChat?.profileImg ? (
        <img
          className="w-14 h-15 rounded-full"
          src={
            currentChat?.profileImg
              ? currentChat.profileImg
              : "https://mui.com/static/images/avatar/1.jpg"
          }
          alt="Neil image"
        />
      ) : (
        <div className="rounded-full bg-gray-500 w-8 h-8 flex items-center justify-center">
          <p className="text-white font-bold">
            {currentChat?.isGroupChat
              ? currentChat.chatName[0]
              : currentChat?.users.filter(
                  (users: any) => users._id !== user._id
                )[0].name[0]}
          </p>
        </div>
      )}
      <div className="flex-1 min-w-0 ms-4">
        <p className="text-sm font-medium text-white-900 truncate dark:text-white">
          {currentChat?.isGroupChat
            ? currentChat.chatName
            : currentChat?.users.filter(
                (users: any) => users._id !== user._id
              )[0].name}
        </p>
        {/* <p className="text-sm text-gray-500 truncate dark:text-gray-400">
          {"online"}
        </p> */}
      </div>
      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white gap-4">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          fill="currentColor"
          className="bi bi-telephone text-white"
          viewBox="0 0 16 16"
        >
          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
        </svg> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          className="bi bi-three-dots text-white"
          viewBox="0 0 16 16"
        >
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
        </svg>
      </div>
    </div>
  );
};
