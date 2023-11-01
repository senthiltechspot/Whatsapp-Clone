import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;
//Crediantials true
export const chatApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
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


export const logout = async () => {
  try {
    const response = await chatApi.post("/wts/v1/api/auth/logout");
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}