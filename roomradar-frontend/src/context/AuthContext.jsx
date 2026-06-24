import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import { socket }
  from "../socket/socket";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  /*
  |--------------------------------------------------------------------------
  | Check Current User
  |--------------------------------------------------------------------------
  */

  const checkAuth =
    async () => {

      try {

        const response =
          await api.get(
            "/auth/me"
          );

        setUser(
  response.data.user
);

if (!socket.connected) {

  socket.connect();

}

      } catch (error) {

        setUser(null);
      } finally {

        setLoading(false);
      }
    };

  /*
  |--------------------------------------------------------------------------
  | Login
  |--------------------------------------------------------------------------
  */

//   const login = (
//     userData
//   ) => {

//     setUser(userData);
//   };

const login =
  async () => {
    await checkAuth();
  };

  /*
  |--------------------------------------------------------------------------
  | Logout
  |--------------------------------------------------------------------------
  */

  const logout =
    async () => {

      try {

        await api.post(
          "/auth/logout"
        );
      } catch (error) {
        console.error(error);
      }

      socket.disconnect();

setUser(null);
    };

  useEffect(() => {

    checkAuth();

  }, []);

  const value = {
    user,

    loading,

    isAuthenticated:
      !!user,

    login,

    logout,

    checkAuth,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth =
  () => {
    return useContext(
      AuthContext
    );
  };