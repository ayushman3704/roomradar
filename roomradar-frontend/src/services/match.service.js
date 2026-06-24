import api from "../api/axios";

export const getMatches =
  async (
    page = 1,
    limit = 20
  ) => {

    const response =
      await api.get(
        `/matches?page=${page}&limit=${limit}`
      );

    return response.data;
  };