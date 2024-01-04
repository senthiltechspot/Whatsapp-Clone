"use client";
import { useAuth } from "@/components/context/Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/chat");
    } else {
      router.push("/auth");
    }
  }, [isLoggedIn, router]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold pb-2">
        Welcome to Whatsapp Clone Created By{" "}
        <a
          href="https://github.com/senthiltechspot/Whatsapp-Clone"
          className="text-blue-500"
        >
          SenthiltechSpot
        </a>
      </h1>
      <h1 className="text-2xl font-bold">
        Please <a href="/auth" className="text-blue-300 underline"> Login</a> to continue
      </h1>
    </div>
  );
}
