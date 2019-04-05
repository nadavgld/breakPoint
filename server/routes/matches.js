const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const auth = require('../middleware/auth');


// @route GET api/matches
// @desc Get all matches
// @access Public
router.post('/', (req, res) => {
    Match.find()
        .then(matches => res.json(matches));
});


// @route POST api/matches
// @desc Create a match
// @access Private
router.post('/', auth, (req, res) => {
    const newMatch = new Match({
        deviceId: req.deviceId,
        players: req.players
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

// @route GET api/matches/:deviceId
// @desc Get One Match By Device ID
// @access Private
router.get('/:deviceId', auth, (req, res) => {
    Match.find({deviceId: req.params.deviceId}, (err, matches) => {
        if (err) {
            console.log(err);
            res.status(400).json({msg: 'Error retrieving matches by device ID'});
        }
        if (!matches || matches.length === 0){
            res.json({msg: 'No matches are played on that device.'})
        }
        res.json(match);
    });
});

module.exports = router;