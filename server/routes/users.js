const express = require('express');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
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
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists.'});

            const newUser = new User({
                name,
                email,
                password
            });

            // encrypt password before storing it in db
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id, name: user.name, email: user.email },
                                config.get('jwtSecret'),
                                { expiresIn: 360000 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user : {
                                            id: user.id,
                                            name: user.email,
                                            email: user.email
                                        }
                                    });
                                }
                            );
                        });
                });
            });
        });
});

// @route GET api/devices/:id
// @desc Get One Device
// @access Public
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => console.log(err));
});

module.exports = router;