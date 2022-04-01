const componentsModel = require('../models/componentsModel.js');

exports.getComponent = (req, res) => {
    componentsModel.getComponent(req.body)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err)
        })
};

exports.createArchive = (req, res) => {
    componentsModel.createArchive(req.body)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err)
    })
};