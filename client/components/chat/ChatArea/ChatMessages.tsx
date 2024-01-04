import React, { useEffect, useRef } from "react";

interface ChatMessagesProps {
  messages: any;
  user: any;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  user,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const convertToIST = (timestamp: string) => {
    const utcDate = new Date(timestamp);
    return utcDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "short",
    });
  };

  const isToday = (someDate: Date) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div
      className="w-full overflow-y-scroll p-3 bg-green-700"
      style={{ height: "80%" }}
    >
      {messages.map(
        (
          chat: { _id: any; message: string; updatedAt: string; userId: any },
          index: number
        ) =>
          chat.userId._id === user?._id ? (
            <div key={index} className="flex justify-end gap-2.5 p-2">
              <div className="flex flex-col gap-1 max-w-[320px]">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {chat.userId.name}
                  </span>
                  <span className="text-sm font-normal text-white-500 dark:text-gray-400">
                    {isToday(new Date(chat.updatedAt))
                      ? convertToIST(chat.updatedAt)
                      : new Date(chat.updatedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                  </span>
                </div>
                <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-green-800 rounded-br-xl rounded-l-xl dark:bg-gray-700">
                  <p className="text-sm font-normal text-white dark:text-white">
                    {chat.message}
                  </p>
                </div>
                {/* <span className="text-sm font-normal text-green-400 dark:text-gray-400">
                  Delivered
                </span> */}
              </div>
              {chat?.userId?.profileImg ? (
                <img
                  className="w-8 h-8 rounded-full"
                  src={chat.userId.profileImg}
                  alt="replied"
                />
              ) : (
                <div className="rounded-full bg-gray-500 w-8 h-8 flex items-center justify-center">
                  <p className="text-white font-bold">
                    {chat.userId.name?.charAt(0).toUpperCase()}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div key={index} className="flex items-start gap-2.5 p-2">
              {chat?.userId?.profileImg ? (
                <img
                  className="w-8 h-8 rounded-full"
                  src={chat.userId.profileImg}
                  alt="received"
                />
              ) : (
                <div className="rounded-full bg-gray-500 w-8 h-8 flex items-center justify-center">
                  <p className="text-white font-bold">
                    {chat.userId.name?.charAt(0).toUpperCase()}
                  </p>
                </div>
              )}
              <div className="flex flex-col gap-1 w-full max-w-[320px]">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {chat.userId.name}
                  </span>
                  <span className="text-sm font-normal text-white-500 dark:text-gray-400">
                    {isToday(new Date(chat.updatedAt))
                      ? convertToIST(chat.updatedAt)
                      : new Date(chat.updatedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                  </span>
                </div>
                <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                  <p className="text-sm font-normal text-gray-900 dark:text-white">
                    {chat.message}
                  </p>
                </div>
                {/* <span className="text-sm font-normal text-green-400 dark:text-gray-400">
                  Delivered
                </span> */}
              </div>
            </div>
          )
      )}
      {/* Sended */}
      {/* <div className="flex items-start gap-2.5">
        <img
          className="w-8 h-8 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="Jese image"
        />
        <div className="flex flex-col gap-1 w-full max-w-[320px]">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              Bonnie Green
            </span>
            <span className="text-sm font-normal text-white-500 dark:text-gray-400">
              11:46
            </span>
          </div>
          <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <p className="text-sm font-normal text-gray-900 dark:text-white">
              That's awesome. I think our users will really appreciate the
              improvements.
            </p>
          </div>
          <span className="text-sm font-normal text-green-400 dark:text-gray-400">
            Delivered
          </span>
        </div>
      </div> */}
      {/* Replied */}
      {/* <div className="flex justify-end w-full gap-2.5">
        <div className="flex flex-col gap-1 w-full max-w-[320px]">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              Bonnie Green
            </span>
            <span className="text-sm font-normal text-white-500 dark:text-gray-400">
              11:46
            </span>
          </div>
          <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-br-xl rounded-l-xl dark:bg-gray-700">
            <p className="text-sm font-normal text-gray-900 dark:text-white">
              That's awesome. I think our users will really appreciate the
              improvements.
            </p>
          </div>
          <span className="text-sm font-normal text-green-400 dark:text-gray-400">
            Delivered
          </span>
        </div>
        <img
          className="w-8 h-8 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="Jese image"
        />
      </div> */}

      <div ref={messagesEndRef} />
    </div>
  );
};
