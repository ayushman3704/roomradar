import { io }
  from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL;

export const socket =
  io(
    SOCKET_URL,
    {
      autoConnect: false,
      withCredentials: true,
    }
  );

socket.on(
  "connect",
  () => {

    console.log(
      "Socket Connected:",
      socket.id
    );
  }
);

socket.on(
  "disconnect",
  () => {

    console.log(
      "Socket Disconnected"
    );
  }
);