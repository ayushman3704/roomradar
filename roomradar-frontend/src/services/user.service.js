import api from "../api/axios";

export const updateProfile =
  async (profileData) => {

    const response =
      await api.put(
        "/users/profile",
        profileData
      );

    return response.data;
  };