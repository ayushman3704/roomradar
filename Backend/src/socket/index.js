import { Server } from "socket.io";

import Message
  from "../models/Message.js";

import ChatRoom
  from "../models/ChatRoom.js";

let io;

/*
|--------------------------------------------------------------------------
| Initialize Socket.io
|--------------------------------------------------------------------------
*/

export const initializeSocket = (
  server
) => {

  io = new Server(server, {
    cors: {
      origin:
        process.env.CLIENT_URL,

      credentials: true,
    },
  });

  /*
  |--------------------------------------------------------------------------
  | Connection Event
  |--------------------------------------------------------------------------
  */

  io.on("connection", (socket) => {

  console.log(
    `Socket Connected: ${socket.id}`
  );

  socket.on(
    "join_room",
    (roomId) => {

      socket.join(
        roomId
      );

      console.log(
        `Socket ${socket.id} joined room ${roomId}`
      );
    }
  );

  socket.on(
  "send_message",
  async (data) => {

    try {

      const {
        roomId,
        text,
        senderId,
      } = data;

      const message =
  await Message.create({
    room: roomId,
    sender: senderId,
    text,
  });

const populatedMessage =
  await Message.findById(
    message._id
  )
    .populate(
      "sender",
      "name avatar"
    );

      await ChatRoom.findByIdAndUpdate(
        roomId,
        {
          lastMessage:
            text,

          lastMessageAt:
            new Date(),
        }
      );

      io.to(roomId).emit(
  "new_message",
  {
    id:
      populatedMessage._id,

    text:
      populatedMessage.text,

    isRead:
      populatedMessage.isRead,

    createdAt:
      populatedMessage.createdAt,

    sender: {
      id:
        populatedMessage.sender._id,

      name:
        populatedMessage.sender.name,

      avatar:
        populatedMessage.sender.avatar,
    },
  }
);

      console.log(
        "Message Saved:",
        message._id
      );

    } catch (error) {

      console.error(
        error
      );
    }
  }
);

  socket.on(
    "disconnect",
    () => {

      console.log(
        `Socket Disconnected: ${socket.id}`
      );
    }
  );

});

  return io;
};

/*
|--------------------------------------------------------------------------
| Get Socket Instance
|--------------------------------------------------------------------------
*/

export const getIO = () => {

  if (!io) {
    throw new Error(
      "Socket.io has not been initialized"
    );
  }

  return io;
};