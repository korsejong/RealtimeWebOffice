const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/', 
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/'
    })
);

module.exports = router;
