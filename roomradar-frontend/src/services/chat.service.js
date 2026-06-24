import api from "../api/axios";

export const getChatRooms =
  async () => {

    const response =
      await api.get(
        "/chat/rooms"
      );

    return response.data;
  };

export const getMessages =
  async (roomId) => {

    const response =
      await api.get(
        `/chat/${roomId}/messages`
      );

    return response.data;
  };

export const sendMessage =
  async (
    roomId,
    text
  ) => {

    const response =
      await api.post(
        `/chat/${roomId}/messages`,
        { text }
      );

    return response.data;
  };

export const markAsRead =
  async (roomId) => {

    const response =
      await api.put(
        `/chat/${roomId}/read`
      );

    return response.data;
  }; 