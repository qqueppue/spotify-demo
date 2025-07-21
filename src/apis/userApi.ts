import type { User } from "../models/user";
import api from "../utils/api";

export const getCurrentUserProfile = async (): Promise<User> => {
  try {
    const response = await api.get('/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    return response.data;

  } catch (error) {
    console.log(error);
    throw new Error("fail to fetch uer profile");
  }
};
