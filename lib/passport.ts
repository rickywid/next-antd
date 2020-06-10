import passport from 'passport';

const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: '822a3e070a7311e38651',
    clientSecret: '83e330c6711297b26827eac726f2327c95a0d635',
    callbackURL: "http://localhost:3000/api/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile)
        return cb(null, profile);
    }
)); 

passport.serializeUser(function(user, done) {
    done(null, user);
  });

passport.deserializeUser(function(user, done) {
    done(null, user);
});
