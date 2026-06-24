import api from "../api/axios";

export const getUserReputation =
  async (userId) => {

    const response =
      await api.get(
        `/users/${userId}/reputation`
      );

    return response.data;
  };

export const createReview =
  async (reviewData) => {

    const response =
      await api.post(
        "/reviews",
        reviewData
      );

    return response.data;
  };