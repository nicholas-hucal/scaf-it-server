const authModel = require('../models/authModel.js');
const passport = require('passport');
const config = require('../config/index.js'); 

exports.connect = passport.authenticate('github');

exports.auth = passport.authenticate('github', {
    failureRedirect: `${config.CLIENT_URL}/error`,
});

exports.callback = (_req, res) => {
    res.redirect(`${config.CLIENT_URL}/editor`);
}

exports.getProfile = (req, res) => {
    if (req.user === undefined) return res.status(401).json({ message: 'Unauthorized' });
    res.status(200).json(req.user);
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect(config.CLIENT_URL);
}