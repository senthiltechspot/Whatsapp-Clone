import { CircularProgress } from "@mui/material";
import React from "react";

export default function Button({ children, isLoading, onClick }) {
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-48 flex justify-center p-10"
    >
      {isLoading ? <CircularProgress size={20} /> : children}
    </button>
  );
}
