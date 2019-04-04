var connectedUsers = {};

export default (io) => {
  io.on('connection', function (socket) {
    socket.on('register', function (data) {
      connectedUsers[data.email]= socket;
    });
  });
}

export const addToRoom = (email, roomId) => {
  connectedUsers[email].join(roomId);
}

export const removeFromRoom = (email, roomId) => {
  connectedUsers[email].leave(roomId);
}