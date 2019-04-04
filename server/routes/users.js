const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route GET api/users
// @desc Get All Users
// @access Public
router.get('/', (req, res) => {
    User.find()
        .sort({name: -1})
        .then(users => res.json(users));
});

// @route POST api/users
// @desc Create a user
// @access Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password){
        return res.status(400).json({ 'msg': 'Please enter all fields'});
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {

        })

    // const newUser = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password:
    // });

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