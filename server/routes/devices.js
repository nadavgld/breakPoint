const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

// @route GET api/devices
// @desc Get All Devices
// @access Public
router.get('/', (req, res) => {
    Device.find()
        .sort({name: -1})
        .then(devices => res.json(devices));
});

// @route POST api/devices
// @desc Create a device
// @access Public
router.post('/', (req, res) => {
    const newDevice = new Device({
        name: req.body.name,
        zone: req.body.zone,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers
    });

    newDevice.save()
        .then(device => res.json(device));
});

// @route GET api/devices/:id
// @desc Get One Device
// @access Public
router.get('/:id', (req, res) => {
    Device.findById(req.params.id)
        .then(device => res.json(device))
        .catch(err => console.log(err));
});

module.exports = router;