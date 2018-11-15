const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post( '/', passport.authenticate('local', {
        failureRedirect: '/',
        failureFlash: true
    }), async (req, res) => {
        res.redirect('/dashboard');
});

module.exports = router;
