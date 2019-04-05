const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const auth = require('../middleware/auth');


// @route GET api/matches
// @desc Get all matches
// @access Public
router.get('/', (req, res) => {
    Match.find()
        .then(matches => res.json(matches));
});


// @route POST api/matches
// @desc Create a match
// @access Private
router.post('/', auth, (req, res) => {
    const newMatch = new Match({
        deviceId: req.body.deviceId,
        players: req.body.players
    });

    newMatch.save()
        .then(match => res.json(match));
});

// @route GET api/matches/:matchId
// @desc Get One Match By Match ID
// @access Private
router.get('/:matchId', auth, (req, res) => {
    Match.findById(req.params.matchId)
        .then(match => res.json(match))
        .catch(err => console.log(err));
});



module.exports = router;