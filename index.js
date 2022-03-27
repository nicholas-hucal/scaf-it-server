require('dotenv').config();
const express = require('express');
const expressSession = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const authModel = require('./models/authModel.js');
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
passport.use(authModel.checkAddUser);
passport.serializeUser(authModel.serializeUser);
passport.deserializeUser(authModel.deserializeUser);

// ROUTES
const homeRoute = require('./routes/homeRoute.js');
app.use('/', homeRoute);
const authRoute = require('./routes/authRoute.js');
app.use('/auth', authRoute);
const componentsRoute = require('./routes/componentsRoute.js');
app.use('/components', componentsRoute);


// LISTEN
app.listen(process.env.PORT || 8080, () => {
    console.log('Capstone Server Rolling');
})