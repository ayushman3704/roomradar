/*
|--------------------------------------------------------------------------
| Online Presence Manager
|--------------------------------------------------------------------------
|
| Keeps track of currently connected users.
| userId -> socketId
|
*/

const onlineUsers = new Map();

/*
|--------------------------------------------------------------------------
| Add User
|--------------------------------------------------------------------------
*/

export const addOnlineUser = (
  userId,
  socketId
) => {

  onlineUsers.set(
    userId,
    socketId
  );
};

/*
|--------------------------------------------------------------------------
| Remove User
|--------------------------------------------------------------------------
*/

export const removeOnlineUser = (
  userId
) => {

  onlineUsers.delete(userId);
};

/*
|--------------------------------------------------------------------------
| Is User Online
|--------------------------------------------------------------------------
*/

export const isUserOnline = (
  userId
) => {

  return onlineUsers.has(userId);
};

/*
|--------------------------------------------------------------------------
| Get User Socket
|--------------------------------------------------------------------------
*/

export const getUserSocket = (
  userId
) => {

  return onlineUsers.get(
    userId
  );
};

/*
|--------------------------------------------------------------------------
| Get All Online Users
|--------------------------------------------------------------------------
*/

export const getOnlineUsers =
  () => {

    return Array.from(
      onlineUsers.keys()
    );
  };