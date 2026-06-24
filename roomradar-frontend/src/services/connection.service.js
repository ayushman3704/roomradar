import api from "../api/axios";

export const sendConnectionRequest =
  async (
    recipientId
  ) => {

    const response =
      await api.post(
        "/connections/request",
        {
          recipientId,
        }
      );

    return response.data;
  };


  export const getIncomingRequests =
  async () => {

    const response =
      await api.get(
        "/connections/requests"
      );

    return response.data;
  };

export const acceptRequest =
  async (
    connectionId
  ) => {

    const response =
      await api.put(
        `/connections/${connectionId}/accept`
      );

    return response.data;
  };

export const rejectRequest =
  async (
    connectionId
  ) => {

    const response =
      await api.put(
        `/connections/${connectionId}/reject`
      );

    return response.data;
  };

  export const getConnections =
  async () => {

    const response =
      await api.get(
        "/connections"
      );

    return response.data;
  };

  export const getSentRequests =
  async () => {

    const response =
      await api.get(
        "/connections/sent"
      );

    return response.data;
  };