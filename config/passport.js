const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

module.exports = function (passport) {
    const opts = {};
    opts.secretOrKey = process.env.SECRET;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        await User.find({
            id: jwt_payload.id
        }, function (err, user) {
            if (err) {
                return done(err, false)
            }
            if (user) {
                return done(null, user)
            }
            else {
                return done(null, false)
            }
        })
    }))
}
