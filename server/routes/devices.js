const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const auth = require('../middleware/auth');
const socket = require('../services/socket');

// @route GET api/devices
// @desc Get All Devices
// @access Private
router.get('/', auth, (req, res) => {
    Device.find()
        .sort({name: -1})
        .then(devices => res.json(devices));
});


// TODO:: Delete this route
// @route POST api/devices
// @desc Create a device
// @access Public
router.post('/', (req, res) => {
    const newDevice = new Device({
        name: req.body.name,
        description: req.body.description,
        zone: req.body.zone,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers
    });

    newDevice.save()
        .then(device => res.json(device));
});

// @route GET api/devices/:id
// @desc Get One Device
// @access Private
router.get('/:id', auth, (req, res) => {
    Device.findById(req.params.id)
        .then(device => res.json(device))
        .catch(err => console.log(err));
});

// route to add user to device lobby
router.post('/:id/lobby', auth, (req, res) => {
    Device.findById(req.params.id)
        .then(device => {
            device.lobby = [...device.lobby, req.user.name];
            device.save()
                .then(device => {
                    socket.addToRoom(req.user.email, device.id);
                    res.json(device) // return only lobby instead of whole device
                });
        });
});

// route to remove user from device lobby
router.delete('/:id/lobby', auth, (req, res) => {
    Device.findById(req.params.id)
        .then(device => {
            device.lobby = device.lobby.filter(name => name !== req.user.name);
            device.save()
                .then(device => {
                    socket.removeFromRoom(req.user.email, device.id);
                    res.status(200)
                });
        });
});

module.exports = router;