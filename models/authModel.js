const GitHubStrategy = require('passport-github2').Strategy;
const knex = require('knex')(require('../knexfile.js').development);
const config = require('../config/index.js'); 

exports.checkAddUser = new GitHubStrategy({
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: config.GITHUB_CALLBACK_URL
},
    (_accessToken, _refreshToken, profile, done) => {
        knex('user')
            .select('id')
            .where({ github_id: profile.id })
            .then(user => {
                if (user.length) {
                    done(null, user[0]);
                } else {
                    knex('user')
                        .insert({
                            github_id: profile.id,
                            avatar_url: profile._json.avatar_url,
                            username: profile.username
                        })
                        .then(userId => {
                            done(null, { id: userId[0] });
                        })
                        .catch(err => {
                            console.log('Error creating a user', err);
                        });
                }
            })
            .catch(err => {
                console.log('Error fetching a user', err);
            });
    }
)

exports.serializeUser = (user, done) => {
    done(null, user.id);
}

exports.deserializeUser = (userId, done) => {
    knex('user')
        .where({ id: userId })
        .then(user => {
            done(null, user[0]);
        })
        .catch(err => {
            console.log('Error finding user', err);
        });
}