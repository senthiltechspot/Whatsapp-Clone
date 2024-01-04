// Login.tsx
import { sendOTP, verifyOTP } from "@/api/auth.api";
import { useAuth } from "@/components/context/Auth";
import { useLoading } from "@/components/context/loading";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type LoginProps = {
  handleLoginToggle: () => void;
};

const Login: React.FC<LoginProps> = ({ handleLoginToggle }) => {
  const { isLoading, setLoading } = useLoading();
  const { login } = useAuth();
  // email state
  const [email, setEmail] = useState("" as string);
  // otp state
  const [otp, setOtp] = useState("" as string);
  // emailsend state
  const [emailSend, setEmailSend] = useState(false);
  const handleSendMail = async () => {
    // Your login logic here
    if (email === "") return;
    setLoading(true);
    try {
      let res = await sendOTP({ email });
      if (res.status === 200) {
        setEmailSend(true);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const router = useRouter();

  // const goToHome = () => {
  //   router.push('/');
  // };
  const handleLogin = async () => {
    // Your login logic here
    // handleLoginToggle();
    setLoading(true);
    try {
      const response = await verifyOTP({ email, OTP: parseInt(otp) });
      if (response.status === 200) {
        sessionStorage.setItem("isLoggedIn", "true");
        login();
        router.push("/chat");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1 className="text-[70px] font-sans">LOGIN</h1>

      {!emailSend ? (
        <div className="flex flex-col gap-4 justify-center items-center md:w-4/5 w-full">
          <h5 className="text-2xl font-bold font-sans">
            Enter Email to Send OTP
          </h5>
          <input
            type="email"
            placeholder="Enter Email"
            className="border-solid border-2 border-green-500 w-full h-16 p-2 rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="bg-green-500 p-2 rounded text-white h-16 w-full hover:bg-green-300"
            onClick={handleSendMail}
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center md:w-4/5 w-full">
          <h5 className="text-3xl font-bold font-sans">Enter OTP</h5>
          <h5>
            OTP Sent to {email} (
            <span
              className="text-green-500 cursor-pointer hover:text-green-300"
              onClick={() => setEmailSend(false)}
            >
              change
            </span>
            )
          </h5>

          <input
            type="number"
            placeholder="Enter OTP"
            className="border-solid border-2 border-green-500 w-full h-16 p-2 rounded text-black"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            className="bg-green-500 p-2 rounded text-white h-16 w-full hover:bg-green-300"
            onClick={handleLogin}
          >
            Verify OTP
          </button>
        </div>
      )}

      <div>
        <h5>
          Don't Have an Account{" "}
          <span
            className="text-green-500 cursor-pointer hover:text-green-300"
            onClick={handleLoginToggle}
          >
            Register
          </span>
        </h5>
      </div>
    </div>
  );
};

export default Login;
