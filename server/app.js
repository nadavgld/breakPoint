const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const app = express();
const port = process.env.PORT || 5000;
const db = config.get('mongoURI');
const initSocket = require('./services/socket');

app.use(express.json());
app.use(require('cors')());

app.use('/api/devices', require('./routes/devices'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth', require('./routes/matches'));

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected Successfully..'))
    .catch(err => console.log(err));

const server = app.listen(port, () => console.log(`Server started on port ${port}`));
const io = require('socket.io')(server);
initSocket.init(io);
