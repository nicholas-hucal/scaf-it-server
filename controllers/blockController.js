const blockModel = require('../models/blockModel.js');

exports.createBlock = (req, res) => {
    blockModel.createBlock(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            console.log(error);
        })
}

exports.getBlock = (req, res) => {
    blockModel.getBlock(req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error);
        })
}

exports.editBlock = (req, res) => {
    blockModel.editBlock(req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error);
        })
}

exports.deleteBlock = (req, res) => {
    blockModel.deleteBlock(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error);
        })
}