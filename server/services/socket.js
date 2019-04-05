var connectedUsers = {};
var _io = {};

module.exports = {
   init: (io) => {
      _io = io;
      _io.origins('*:*');
      io.on('connection', function (socket) {
        socket.on('register', function (data) {
          connectedUsers[data.email] = socket;
        });
      });
   },
   addToRoom: (email, roomId) => {
    connectedUsers[email].join(roomId);
    _io.to(roomId).emit('new_user_in_room', email);
   },
   removeFromRoom: (email, roomId) => {
    connectedUsers[email].leave(roomId);
    _io.to(roomId).emit('user_left_room', email);
   }

}