import { TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Button from "../GenericComponents/Button/Button";

export default function Register({ setIsLogin, isLoading, setIsLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    username: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    //validations
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setFormErrors({ ...formErrors, email: "Email is invalid" });
      } else {
        setFormErrors({ ...formErrors, email: "" });
      }
    }
    if (name === "username") {
      //username should not have space and should be at least 3 characters
      if (value.length < 3) {
        setFormErrors({ ...formErrors, username: "Username is too short" });
      }
      if (value.includes(" ")) {
        setFormErrors({
          ...formErrors,
          username: "Username cannot contain space",
        });
      } else {
        setFormErrors({ ...formErrors, username: "" });
      }
    }
    if (name === "name") {
      if (value.length < 3) {
        setFormErrors({ ...formErrors, name: "Name is too short" });
      } else {
        setFormErrors({ ...formErrors, name: "" });
      }
    }
  };

  const handleRegister = async () => {
    // check for errors
    if (!formErrors.name && !formErrors.username && !formErrors.email) {
      setIsLoading(true);

      try {
        const { name, email, username } = formData;
        const response = await axios.post(
          "http://localhost:5000/wts/v1/api/auth/register",
          {
            name,
            email,
            username,
          }
        );

        setMessage(response.data.message);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setMessage("Error registering user");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="h-96 flex flex-col gap-3 justify-center items-center">
      <h1>REGISTER</h1>
      <>
        <div>Enter Name</div>
        <TextField
          error={formErrors.name ? true : false}
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          color="success"
          value={formData.name}
          onChange={handleChange}
        />

        <div>Enter Username</div>
        <TextField
          error={formErrors.username ? true : false}
          id="username"
          name="username"
          label="Username"
          variant="outlined"
          color="success"
          value={formData.username}
          onChange={handleChange}
        />

        <div>Enter Email</div>
        <TextField
          error={formErrors.email ? true : false}
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          color="success"
          value={formData.email}
          onChange={handleChange}
        />

        {/* <Button variant="contained" onClick={handleRegister}>
          Register
        </Button> */}
        <Button onClick={handleRegister} isLoading={isLoading}>
          Register
        </Button>
      </>

      {message && <div className="text-green-500">{message}</div>}

      <div>
        <h5>
          Already Have an Account{" "}
          <span
            className="text-green-500 cursor-pointer hover:text-green-300"
            onClick={() => setIsLogin(true)}
          >
            Login
          </span>
        </h5>
      </div>
    </div>
  );
}
