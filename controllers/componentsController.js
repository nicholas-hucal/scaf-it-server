const componentsModel = require('../models/componentsModel.js');

exports.index = (req, res) => {
    // res.status(200).json(componentsModel.index());
    res.status(200).json(componentsModel.index(req.body));
};