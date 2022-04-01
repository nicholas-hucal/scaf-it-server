const elementModel = require('../models/elementModel.js');

exports.createElement = (req, res) => {
    elementModel.createElement(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            console.log(error);
        })
}

exports.getElement = (req, res) => {
    elementModel.getElement(req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error);
        })
}

exports.editElement = (req, res) => {
    console.log(req.body)
    elementModel.editElement(req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error);
        })
}

exports.deleteElement = (req, res) => {
    elementModel.deleteElement(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error);
        })
 }