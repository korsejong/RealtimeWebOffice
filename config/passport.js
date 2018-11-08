const User = require("../models/user");

module.exports = ( passport ) => {
    const LocalStrategy = passport.Strategy;
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
                    return done(null, false, req.flash('message', 'onerror'));
                }
                //'trimStr' has null string
                if(trimStr.indexOf(" ") > 0){
                    return done(null, false, req.flash('message', ''));
                }
                //no user
                if (!user)
                    return done(null, false, req.flash('message', ''));
                // no exist password
                if (!user.isExistPassword()) {
                    return done(null, false, req.flash('message', ''));
                }
                // password wrong
                if (!user.validPassword(pw))
                    return done(null, false, req.flash('message', ''));
                // done
                done(null, user);
            });
        }
    ));
};