import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { socket } from "../socket/socket";

const PresenceContext =
  createContext();

export const PresenceProvider = ({
  children,
}) => {

  /*
  |--------------------------------------------------------------------------
  | Online Users
  |--------------------------------------------------------------------------
  */

  const [
    onlineUsers,
    setOnlineUsers,
  ] = useState(new Set());

  /*
  |--------------------------------------------------------------------------
  | User Online
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const handleUserOnline =
      (userId) => {

        setOnlineUsers(
          (prev) => {

            const updated =
              new Set(prev);

            updated.add(userId);

            return updated;
          }
        );
      };

    /*
    |--------------------------------------------------------------------------
    | User Offline
    |--------------------------------------------------------------------------
    */

    const handleUserOffline =
      (userId) => {

        setOnlineUsers(
          (prev) => {

            const updated =
              new Set(prev);

            updated.delete(userId);

            return updated;
          }
        );
      };

    const handleOnlineUsers =
  (users) => {

    setOnlineUsers(
      new Set(users)
    );
  };

socket.on(
  "online_users",
  handleOnlineUsers
);

    socket.on(
      "user_online",
      handleUserOnline
    );

    socket.on(
      "user_offline",
      handleUserOffline
    );

    return () => {

      socket.off(
        "user_online",
        handleUserOnline
      );

      socket.off(
        "user_offline",
        handleUserOffline
      );
    };

  }, []);

  /*
  |--------------------------------------------------------------------------
  | Helpers
  |--------------------------------------------------------------------------
  */

  const isOnline =
    (userId) => {

      return onlineUsers.has(
        userId
      );
    };

  return (

    <PresenceContext.Provider
      value={{
        onlineUsers,
        isOnline,
      }}
    >

      {children}

    </PresenceContext.Provider>

  );
};

export const usePresence =
  () => {

    return useContext(
      PresenceContext
    );
  };