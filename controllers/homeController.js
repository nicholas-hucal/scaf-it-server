const homeModel = require('../models/homeModel.js');

exports.index = (_req, res) => {
    res.status(200).json(homeModel.index());
};