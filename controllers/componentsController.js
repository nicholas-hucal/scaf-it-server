const { response } = require('express');
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

exports.createBlock = (req, res) => {
    componentsModel.createBlock(req.body)
        .then(response => {
            console.log(response)
            res.status(201).json(response)
        })
        .catch(error => {
            console.log(error);
        })
}

exports.getBlock = (req, res) => {
    componentsModel.getBlock(11)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error);
        })
}

exports.editBlock = (req, res) => {
    componentsModel.editBlock(req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error);
        })
}

exports.deleteBlock = (req, res) => {
    componentsModel.deleteBlock(req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error);
        })
}

exports.createElement = (req, res) => {
    componentsModel.createElement(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            console.log(error);
        })
}

exports.getElement = (req, res) => {
    componentsModel.getElement(req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error);
        })
}

exports.editElement = (req, res) => {
    componentsModel.editElement(req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error);
        })
}

exports.deleteElement = (req, res) => {
    componentsModel.deleteElement(req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error);
        })
}