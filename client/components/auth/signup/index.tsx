// Signup.tsx
import { registerapi } from "@/api/auth.api";
import { useLoading } from "@/components/context/loading";
import React, { useState } from "react";

type SignupProps = {
  handleLoginToggle: () => void;
};

const Signup: React.FC<SignupProps> = ({ handleLoginToggle }) => {
  const { setLoading } = useLoading();

  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleRegister = async () => {
    // Your register logic here
    setLoading(true);
    if(values.name === "" || values.username === "" || values.email === "") return;
    try {
      let res = await registerapi({
        name: values.name,
        username: values.username,
        email: values.email,
      });
      if (res.status === 201) {
        handleLoginToggle();
      }
    } catch (error) {
      console.log(error); 
      alert("Something went wrong");
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1 className="text-[70px] font-sans">Register</h1>

      <div className="flex flex-col gap-4 justify-center items-center md:w-4/5 w-full">
        <h5 className="text-2xl font-bold font-sans">Enter Name</h5>
        <input
          type="text"
          placeholder="Enter Name"
          className="border-solid border-2 border-green-500 w-full h-16 p-2 rounded text-black"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
        <h5 className="text-2xl font-bold font-sans">Enter Username</h5>
        <input
          type="text"
          placeholder="Enter Username"
          className="border-solid border-2 border-green-500 w-full h-16 p-2 rounded text-black"
          name="username"
          value={values.username}
          onChange={handleChange}
          required
        />
        <h5 className="text-2xl font-bold font-sans">Enter Email</h5>
        <input
          type="email"
          placeholder="Enter Email"
          className="border-solid border-2 border-green-500 w-full h-16 p-2 rounded text-black"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
        <button className="bg-green-500 p-2 rounded text-white h-16 w-full hover:bg-green-300" onClick={handleRegister}>
          Register
        </button>
      </div>

      <div>
        <h5>
          Already Have an Account{" "}
          <span
            className="text-green-500 cursor-pointer hover:text-green-300"
            onClick={handleLoginToggle}
          >
            Login
          </span>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
