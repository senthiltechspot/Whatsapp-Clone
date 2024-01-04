import React from "react";
import { LoadingProvider } from "./loading";
import { SocketProvider } from "./Socket";
import { AuthProvider } from "./Auth";

export const IndexProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <SocketProvider>
          {children}
        </SocketProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};
