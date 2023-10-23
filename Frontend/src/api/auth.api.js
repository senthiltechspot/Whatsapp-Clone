import axios from "axios";
axios.defaults.withCredentials = true;

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;
//Crediantials true
export const chatApi = axios.create({
  baseURL: BASE_URL,
});

export const registerapi = async (data) => {
  try {
    const response = await chatApi.post("/wts/v1/api/auth/register", data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sendOTP = async (data) => {
  try {
    const response = await chatApi.post("/wts/v1/api/auth/sendOTP", data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const verifyOTP = async (data) => {
  try {
    const response = await chatApi.post("/wts/v1/api/auth/verifyOTP", data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
