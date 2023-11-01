import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;
//Crediantials true
export const chatApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getAllUser = async () => {
  try {
    const response = await chatApi.get("/wts/v1/api/user/getAllUser");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
