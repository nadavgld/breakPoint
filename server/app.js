const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./config/keys').mongoURI;

app.use(express.json());

app.use('/api/devices', require('./routes/devices'));

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected Successfully..'))
    .catch(err => console.log(err));

app.listen(port, () => console.log(`Server started on port ${port}`));