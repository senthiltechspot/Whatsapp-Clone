import React, { useState } from "react";
import { TextField } from "@mui/material";
import VerifyOTP from "./VerifyOTP"; // Import the OtpVerification component
import axios from "axios";
import Button from "../GenericComponents/Button/Button";

export default function Login({ setIsLogin, isLoading, setIsLoading }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    //handle error validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(event.target.value)) {
      setEmailError("Email is invalid");
    } else {
      setEmailError("");
    }
  };

  const handleSendEmail = async () => {
    //check for error
    if (!emailError && email.length > 0) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/wts/v1/api/auth/sendOTP",
          { email }
        );
        if (response.status === 200) {
          setEmailSent(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setEmailError("Error sending OTP");
        setIsLoading(true);
      }
    }
  };

  return (
    <div className="h-96 flex flex-col gap-4 justify-center items-center">
      <h1>LOGIN</h1>
      {!emailSent && (
        <>
          <div>Enter Email to Send OTP</div>
          <TextField
            error={emailError ? true : false}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            color="success"
            value={email}
            onChange={handleEmailChange}
          />
          {/* <button onClick={handleSendEmail}>Send OTP</button>{" "} */}
          <Button onClick={handleSendEmail} isLoading={isLoading}>
            Send OTP
          </Button>
        </>
      )}

      {emailSent ? (
        <VerifyOTP
          email={email}
          setIsLogin={setIsLogin}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      ) : null}

      <div>
        <h5>
          Don't Have an Account{" "}
          <span
            className="text-green-500 cursor-pointer hover:text-green-300"
            onClick={() => setIsLogin(false)}
          >
            Register
          </span>
        </h5>
      </div>
    </div>
  );
}
