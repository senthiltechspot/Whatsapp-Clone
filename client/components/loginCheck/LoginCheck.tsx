import React from "react";
import { useAuth } from "../context/Auth";

export const LoginCheck = () => {
  const { TriggerCheckLogin, isLoggedIn } = useAuth();

  setInterval(() => {
    if(!isLoggedIn) {
      TriggerCheckLogin();
    }
  }, 5000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white" />
    </div>
  );
};
