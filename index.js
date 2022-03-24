require('dotenv').config();
const express = require('express');
const expressSession = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const knex = require('knex')(require('./knexfile.js').development);
const app = express();


//MIDDLEWARE
app.use(
    cors({
        origin: true,
        credentials: true
    })
);
app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
);
app.use(express.static('./public'));
app.use(express.json());
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    },
        (_accessToken, _refreshToken, profile, done) => {
            console.log('GitHub profile:', profile);
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
);
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((userId, done) => {
    knex('user')
        .where({ id: userId })
        .then(user => {
            done(null, user[0]);
        })
        .catch(err => {
            console.log('Error finding user', err);
        });
});

// ROUTES
const homeRoute = require('./routes/homeRoute.js');
app.use('/', homeRoute);
const authRoute = require('./routes/authRoute.js');
app.use('/auth', authRoute);

// LISTEN
app.listen(process.env.PORT || 8080, () => {
    console.log('Capstone Server Rolling');
})