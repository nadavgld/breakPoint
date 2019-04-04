var connectedUsers = {};
var _io = io;
export default (io) => {
  _io = io;
  io.on('connection', function (socket) {
    socket.on('register', function (data) {
      connectedUsers[data.email] = socket;
    });
  });
}

export const addToRoom = (email, roomId) => {
  connectedUsers[email].join(roomId);
  _io.to(roomId).emit('new_user_in_room', email);
}

export const removeFromRoom = (email, roomId) => {
  connectedUsers[email].leave(roomId);
  _io.to(roomId).emit('user_left_room', email);