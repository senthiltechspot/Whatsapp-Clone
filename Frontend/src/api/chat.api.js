import axios from "axios";
axios.defaults.withCredentials = true;

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;
//Crediantials true
export const chatApi = axios.create({
  baseURL: BASE_URL,
});

export const getAllGroupsForUserAPI = async () => {
  try {
    const { data } = await chatApi.get("/wts/v1/api/chat/getAllGroup");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUserDetails = async () => {
  try {
    const { data } = await chatApi.get("/wts/v1/api/user");
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const AllUsersInGroup = async () => {
  try {
    const { data } = await chatApi.get("/wts/v1/api/user/AllUsersInGroup");
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const PersonalChat = async (id) => {
  try {
    const { data } = await chatApi.post(`/wts/v1/api/chat/personalChat/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
