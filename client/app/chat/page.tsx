"use client";
import React, { useEffect } from "react";
import Layer from "@/components/chat/Layer/Layer";
import { useSocket } from "@/components/context/Socket";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/Auth";

export default function Page() {
  // Change function name to start with a capital letter
  const router = useRouter();
  const { AllGroups, user } = useSocket();

  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  if (isLoggedIn) {
    return <Layer chats={AllGroups} user={user} />; // Render if logged in
  }

  return null;
}
