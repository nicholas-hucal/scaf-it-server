require('dotenv').config()
const passport = require('passport');

exports.connect = passport.authenticate('github');

exports.auth = passport.authenticate('github', {
    failureRedirect: `${process.env.CLIENT_URL}/error`,
});

exports.callback = (_req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/editor`);
}

exports.getProfile = (req, res) => {
    if (req.user === undefined) return res.status(401).json({ message: 'Unauthorized' });
    res.status(200).json(req.user);
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
}