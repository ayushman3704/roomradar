import {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  getChatRooms,
  getMessages,
  sendMessage,
  markAsRead,
} from "../services/chat.service";

import {
  useAuth,
} from "../context/AuthContext";

import {
  socket,
} from "../socket/socket";

import {
  usePresence,
} from "../context/PresenceContext";

const Chat = () => {

  const { user } =
    useAuth();

  const {
    isOnline,
  } = usePresence();

  const currentUserId =
    user?.id ||
    user?._id;

  const [rooms,
    setRooms] =
    useState([]);

  const [selectedRoom,
    setSelectedRoom] =
    useState(null);

  const [messages,
    setMessages] =
    useState([]);

  const [text,
    setText] =
    useState("");

  const messagesEndRef =
    useRef(null);

  /*
  |--------------------------------------------------------------------------
  | Frontend Listener
  |--------------------------------------------------------------------------
  */
    

  useEffect(() => {

  const handleNewMessage =
    (message) => {

      setMessages(
        (prev) => [
          ...prev,
          message,
        ]
      );
    };

  socket.on(
    "new_message",
    handleNewMessage
  );

  return () => {

    socket.off(
      "new_message",
      handleNewMessage
    );
  };

}, []);

  /*
  |--------------------------------------------------------------------------
  | Auto Scroll
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    messagesEndRef.current
      ?.scrollIntoView({
        behavior: "smooth",
      });

  }, [messages]);

  /*
  |--------------------------------------------------------------------------
  | Load Rooms
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const loadRooms =
      async () => {

        try {

          const response =
            await getChatRooms();

          setRooms(
            response.rooms
          );

        } catch (error) {

          console.error(
            error
          );
        }
      };

    loadRooms();

  }, []);

  /*
  |--------------------------------------------------------------------------
  | Open Room
  |--------------------------------------------------------------------------
  */

  const openRoom =
  async (room) => {

    try {

      setSelectedRoom(
        room
      );

      const response =
        await getMessages(
          room.roomId
        );

      setMessages(
        response.messages
      );

      await markAsRead(
        room.roomId
      );

      socket.emit(
        "join_room",
        room.roomId
      );

      console.log(
        "Joined Room:",
        room.roomId
      );

    } catch (error) {

      console.error(
        error
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Send Message
  |--------------------------------------------------------------------------
  */

  const handleSend =
  async () => {

    if (
      !text.trim() ||
      !selectedRoom
    ) {
      return;
    }

    socket.emit(
      "send_message",
      {
        roomId:
          selectedRoom.roomId,

        text,

        senderId:
          currentUserId,
      }
    );

    setText("");
  };

  return (
    <div className="h-[80vh] bg-white rounded-xl shadow flex overflow-hidden">

      {/* Sidebar */}

      <div className="w-80 border-r bg-white">

        <div className="p-4 border-b font-bold text-xl">

          Chats

        </div>

        {rooms.map(
          (room) => (

            <button
              key={
                room.roomId
              }
              onClick={() =>
                openRoom(
                  room
                )
              }
              className={`
                w-full
                p-4
                text-left
                border-b
                hover:bg-gray-50

                ${
                  selectedRoom?.roomId ===
                  room.roomId
                    ? "bg-blue-50"
                    : ""
                }
              `}
            >

              <div className="font-semibold">

                {
                  room.user.name
                }

              </div>

              <div className="text-sm text-gray-500">

                {
                  room.user.city
                }

              </div>

            </button>
          )
        )}

      </div>

      {/* Chat Area */}

      <div className="flex-1 flex flex-col bg-gray-50">

        {selectedRoom ? (

          <>

            {/* Header */}

            <div className="bg-white border-b px-6 py-4">

  <div className="flex items-center justify-between">

    <div>

      <h2 className="text-lg font-semibold">

        {selectedRoom.user.name}

      </h2>

      <div className="flex items-center gap-2 mt-1">

        <span
          className={`w-2.5 h-2.5 rounded-full ${
            isOnline(
              selectedRoom.user.id
            )
              ? "bg-green-500"
              : "bg-gray-400"
          }`}
        />

        <span
          className={`text-sm ${
            isOnline(
              selectedRoom.user.id
            )
              ? "text-green-600"
              : "text-gray-500"
          }`}
        >

          {isOnline(
            selectedRoom.user.id
          )
            ? "Online"
            : "Offline"}

        </span>

      </div>

    </div>

  </div>

</div>

            {/* Messages */}

            <div
              className="
                flex-1
                overflow-y-auto
                px-4
                py-6
                space-y-4
              "
            >

              {messages.map(
                (
                  message
                ) => {

                  const isMine =
                    message.sender.id ===
                    currentUserId;

                  return (

                    <div
                      key={
                        message.id
                      }
                      className={`
                        flex
                        ${
                          isMine
                            ? "justify-end"
                            : "justify-start"
                        }
                      `}
                    >

                      <div
                        className={`
                          max-w-[70%]
                          px-4
                          py-3
                          rounded-2xl
                          shadow-sm

                          ${
                            isMine
                              ? `
                                bg-blue-600
                                text-white
                                rounded-br-md
                              `
                              : `
                                bg-white
                                text-gray-900
                                rounded-bl-md
                              `
                          }
                        `}
                      >

                        <div className="break-words">

                          {
                            message.text
                          }

                        </div>

                        <div
                          className={`
                            text-xs
                            mt-1
                            text-right

                            ${
                              isMine
                                ? "text-blue-100"
                                : "text-gray-500"
                            }
                          `}
                        >

                          {new Date(
                            message.createdAt
                          ).toLocaleTimeString(
                            [],
                            {
                              hour:
                                "2-digit",
                              minute:
                                "2-digit",
                            }
                          )}

                        </div>

                      </div>

                    </div>
                  );
                }
              )}

              <div
                ref={
                  messagesEndRef
                }
              />

            </div>

            {/* Input */}

            <div className="bg-white border-t p-4 flex gap-3">

              <input
                type="text"
                value={text}
                onChange={(
                  e
                ) =>
                  setText(
                    e.target.value
                  )
                }
                onKeyDown={(
                  e
                ) => {

                  if (
                    e.key ===
                    "Enter"
                  ) {

                    handleSend();
                  }
                }}
                placeholder="Type a message..."
                className="
                  flex-1
                  border
                  rounded-full
                  px-5
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              <button
                onClick={
                  handleSend
                }
                className="
                  bg-blue-600
                  text-white
                  px-6
                  rounded-full
                  hover:bg-blue-700
                "
              >
                Send
              </button>

            </div>

          </>

        ) : (

          <div
            className="
              flex-1
              flex
              items-center
              justify-center
              text-gray-500
            "
          >

            Select a chat to start messaging

          </div>

        )}

      </div>

    </div>
  );
};

export default Chat;