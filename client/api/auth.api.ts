import axios, { AxiosResponse } from "axios";

interface RegisterData {
  email: string;
  name: string;
  username: string;
}

interface SendOTPData {
  email: string;
}

interface OTPData {
  email: string;
  OTP: Number;
}

const BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL || "";
// Credentials set to true
export const chatApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const registerapi = async (
  data: RegisterData
): Promise<AxiosResponse> => {
  try {
    const response = await chatApi.post("/wts/v1/api/auth/register", data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sendOTP = async (data: SendOTPData): Promise<AxiosResponse> => {
  try {
    const response = await chatApi.post("/wts/v1/api/auth/sendOTP", data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyOTP = async (data: OTPData): Promise<AxiosResponse> => {
  try {
    const response = await chatApi.post("/wts/v1/api/auth/verifyOTP", data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async (): Promise<AxiosResponse> => {
  try {
    const response = await chatApi.post("/wts/v1/api/auth/logout");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
