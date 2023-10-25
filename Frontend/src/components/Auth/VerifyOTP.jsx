import React, { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import Button from "../GenericComponents/Button/Button";
import { verifyOTP } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP({
  email,
  setIsLoading,
  setIsLogin,
  isLoading,
}) {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();
  const handleOtpChange = (event) => {
    setOtp(event.target.value);
    //Otp should be 4 digits and it shoud be numberic only
    if (event.target.value.length !== 4) {
      setOtpError("Otp should be 4 digits");
    } else {
      setOtpError("");
    }
  };

  const handleVerifyOTP = async () => {
    //check for errors
    if (!otpError && otp.length === 4) {
      setIsLoading(true);
      const response = await verifyOTP({ email, OTP: parseInt(otp) });
      if (response.status === 200) {
        setIsLogin(true);
        setIsLoading(false);
        // navigate("/chat");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2>Enter OTP</h2>
      <TextField
        error={otpError ? true : false}
        id="outlined-basic"
        label="OTP"
        variant="outlined"
        type="number"
        value={otp}
        onChange={handleOtpChange}
      />
      {/* <button onClick={handleVerifyOTP}>Verify OTP</button> */}
      <Button onClick={handleVerifyOTP} isLoading={isLoading}>
        Verify OTP
      </Button>
    </>
  );
}
