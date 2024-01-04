import axios, { AxiosResponse } from "axios";

axios.defaults.withCredentials = true;

const BASE_URL: string = `${process.env.NEXT_PUBLIC_BASE_URL}`;

// API instance
export const chatApi = axios.create({
  baseURL: BASE_URL,
});

// Types for responses
interface GroupData {}

interface UserData {}

interface UsersInGroupData {}

interface PersonalChatData {}

// API functions
export const getAllGroupsForUserAPI = async (): Promise<GroupData[]> => {
  try {
    const { data }: AxiosResponse<GroupData[]> = await chatApi.get(
      "/wts/v1/api/chat/getAllGroup"
    );
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUserDetails = async (): Promise<UserData | undefined> => {
  try {
    const { data }: AxiosResponse<UserData> = await chatApi.get(
      "/wts/v1/api/user"
    );
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const AllUsersInGroup = async (): Promise<
  UsersInGroupData | undefined
> => {
  try {
    const { data }: AxiosResponse<UsersInGroupData> = await chatApi.get(
      "/wts/v1/api/user/AllUsersInGroup"
    );
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const PersonalChat = async (
  id: string
): Promise<PersonalChatData | undefined> => {
  try {
    const { data }: AxiosResponse<PersonalChatData> = await chatApi.post(
      `/wts/v1/api/chat/personalChat/${id}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getAllUsers = async () => {
  // /wts/v1/api/user/getAllUser
  try {
    const { data }: AxiosResponse<PersonalChatData> = await chatApi.get(
      `/wts/v1/api/user/getAllUser`
    );
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export default {
  getAllGroupsForUserAPI,
  getUserDetails,
  AllUsersInGroup,
  PersonalChat,
  getAllUsers
};
