const componentsModel = require('../models/componentsModel.js');

exports.index = (req, res) => {
    componentsModel.createComponent(req.body)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            console.log(error);
        })
};