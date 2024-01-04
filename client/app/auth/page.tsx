"use client";
import Login from "@/components/auth/login";
import Signup from "@/components/auth/signup";
import { useAuth } from "@/components/context/Auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/chat");
    }
  }, [isLoggedIn, router]);

  const handleLoginToggle = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className="h-screen py-10">
      <div className="flex justify-center items-center border-solid border-2 border-green-500 bg-emerald-700 mx-10 h-full">
        <div className="w-1/2 hidden sm:block p-1 h-full">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="md:w-1/2">
          {isLogin ? (
            <Login handleLoginToggle={handleLoginToggle} />
          ) : (
            <Signup handleLoginToggle={handleLoginToggle} />
          )}
        </div>
      </div>
    </div>
  );
}
