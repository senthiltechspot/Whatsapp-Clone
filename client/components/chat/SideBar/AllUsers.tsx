import { useSocket } from "@/components/context/Socket";
import React from "react";

interface SidebarHeaderProps {
  showUsers: boolean;
  setShowUsers: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AllUsers: React.FC<SidebarHeaderProps> = ({
  showUsers,
  setShowUsers,
}) => {
  const { users, handleUserSelect } = useSocket();

  return (
    <div
      className={`fixed w-40 max-w-md z-50 bg-slate-950 overflow-y-scroll scrollbar-w-2 h-screen overflow-x-hidden transition-all duration-1000 ${
        showUsers ? "left-0" : "-left-40"
      }`}
      style={{ width: showUsers ? "280px" : "0", zIndex: 999 }}
    >
      <div className="flex items-center justify-between p-3">
        <h3>All Users</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          className="bi bi-x-circle-fill"
          viewBox="0 0 16 16"
          onClick={() => setShowUsers(false)}
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
        </svg>
      </div>
      <ul role="list" className="divide-y bg-black-900">
        {users.map((user: any, index: number) => (
          <li key={index} className={`p-3  sm:py-4 hover:bg-zinc-600 `} onClick={() => handleUserSelect(user)}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src={
                    user.profileImg
                      ? user.profileImg
                      : "https://mui.com/static/images/avatar/1.jpg"
                  }
                  alt="Neil image"
                />
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium truncate dark:text-white">
                  {user.name}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
