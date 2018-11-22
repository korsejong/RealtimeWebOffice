const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
module.exports = (passport) => {
    passport.serializeUser( ( user, done ) => {
        done( null, user.id );
    });
    passport.deserializeUser( ( id, done ) => {
        User.findById( id, ( err, user ) => {
            done( err, user );
        });
    });

    // default local strategy
    passport.use( new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: true
    }, ( req, id, pw, done ) => {
        let trimStr = id.toString().trim();
        User.findOne({ email: trimStr, deleted: false },  (err, user) => {
                if(err){
                    return done(null, false);
                }
                //'trimStr' has null string
                if(trimStr.indexOf(" ") > 0){
                    return done(null, false);
                }
                //no user
                if (!user)
                    return done(null, false);
                // no exist password
                if (!user.isExistPassword()) {
                    return done(null, false);
                }
                // password wrong
                if (!user.validPassword(pw))
                    return done(null, false);
                // done
                done(null, user);
            });
        }
    ));
};