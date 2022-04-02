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
        resave: true,
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

// CHECK AUTH ON ROUTES
app.use((req, res, next) => {
    const reqParts = req.url.split('/')
    if (reqParts[1] === 'auth' && (reqParts[2] === 'github' || reqParts[2] === 'profile' || reqParts[2] === 'logout')) {
        next()
    } else {
        if(!req.isAuthenticated()) {
            return res.status(401).json({message: "unauthorized please login"})
        }
        next()
    }
})

// ROUTES
const authRoute = require('./routes/authRoute.js');
app.use('/auth', authRoute);
const blockRoute = require('./routes/blockRoute.js');
app.use('/block', blockRoute);
const elementRoute = require('./routes/elementRoute.js');
app.use('/element', elementRoute);
const componentsRoute = require('./routes/componentsRoute.js');
app.use('/components', componentsRoute);

// LISTEN
app.listen(process.env.PORT || 8080, () => {
    console.log('Capstone Server Rolling');
})