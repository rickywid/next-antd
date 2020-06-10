import passport from 'passport';
import db from '../middlewares/database';
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: `${process.env.HOSTNAME}/api/auth/github/callback`
    },
    async function(accessToken, refreshToken, profile, cb) {
        const findUser = {
            text: `
                SELECT * 
                FROM users 
                WHERE gh_id = $1;
            `,
            values: [profile.id]
        }
        const user = await db.query(findUser);
        
        if(user.rows.length === 0) {
            const createUser = {
                text: `
                    INSERT INTO users (username, gh_id, gh_displayname, gh_avatar, gh_profile_url)
                    VALUES ($1, $2, $3, $4, $5) RETURNING *
                `,
                values: [
                    profile.username,
                    profile.id,
                    profile.displayName, 
                    profile.photos[0].value, 
                    profile.profileUrl
                ]
            }

            const user = await db.query(createUser);
            return cb(null, user.rows[0]);
        }
        return cb(null, user.rows[0]);
    }
)); 

passport.serializeUser(function(user, done) {
    done(null, user);
  });

passport.deserializeUser(function(user, done) {
    done(null, user);
});
