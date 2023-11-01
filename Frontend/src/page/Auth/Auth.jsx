import React, { useEffect } from "react";
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";
import { getUserDetails } from "../../api/chat.api";

export default function Auth() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    const fetchuser = async () => {
      const res = await getUserDetails();
      if (res) {
        console.log("Already Logged In");
        // setIsLogin(false);
        window.location.href = "/chat";
      } else {
        console.log("error");
      }
    };
    fetchuser();
  }, [isLogin]);
  return (
    <div
      style={{ height: "600px" }}
      className="flex justify-center items-center border-solid border-2 border-green-500 bg-emerald-700 m-10"
    >
      <div className="w-1/2 hidden sm:block p-1">
        <img
          src="https://source.unsplash.com/random"
          alt=""
          width={"700px"}
          style={{ height: "590px" }}
        />
      </div>
      <div className="md:w-1/2">
        {isLogin ? (
          <Login
            setIsLogin={setIsLogin}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <Register
            setIsLogin={setIsLogin}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </div>
    </div>
  );
}
