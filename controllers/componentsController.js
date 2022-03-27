const componentsModel = require('../models/componentsModel.js');

exports.index = (_req, res) => {
    res.status(200).json(componentsModel.index());
};