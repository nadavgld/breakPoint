const Device = require('../models/Device');

var connectedUsers = {};
var _io = {};

module.exports = {
   init: (io) => {
      _io = io;
      _io.origins('*:*');
      io.on('connection', function (socket) {
        console.log('connection established', socket.id)
        socket.on('register', function (data) {
          console.log('socket registered', data)
          connectedUsers[data.email] = socket;
        });
        socket.on('disconnect', (reason) => {
          console.log('socket disconnected', reason)
          Object.keys(connectedUsers).forEach(user => {
            if (connectedUsers[user].id == socket.id) {
              delete connectedUsers[user];
            }
            // Device.findById(req.params.id)
            // .then(device => {
            //     device.lobby = device.lobby.filter(name => name !== req.user.name);
            //     device.save();
            // });
          });
        });
      });
   },
   addToRoom: (email, name, roomId) => {
    console.log(`adding ${email} to room ${roomId}`);
    connectedUsers[email].join(roomId);
    _io.to(roomId).emit('new_user_in_room', name);
   },
   removeFromRoom: (email, name, roomId) => {
    console.log(`removing ${name} from room ${roomId}`);
    connectedUsers[email].leave(roomId);
    _io.to(roomId).emit('user_left_room', name);
    console.log(`removed ${name} from ${roomId}`)
   }

}