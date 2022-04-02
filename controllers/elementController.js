const { request } = require('express');
const elementModel = require('../models/elementModel.js');
const responses = require('../utils/responses.js');

exports.createElement = (req, res) => {
    if (validateElement(req)) {
        elementModel.createElement(req.body)
            .then(response => {
                if (response.error) {
                    return responses.server(res)
                }
                res.status(201).json(response)
            })
            .catch(error => {
                responses.server(res)
            })
    } else {
        return responses.badRequest(res);
    }
}

exports.getElement = (req, res) => {
    if (validateElement(req)) {
        elementModel.getElement(req.body)
            .then(response => {
                if (response.error) {
                    return responses.server(res)
                }
                res.status(200).json(response)
            })
            .catch(error => {
                responses.server(res)
            })
    } else {
        return responses.badRequest(res);
    }
}

exports.editElement = (req, res) => {
    if (validateElement(req)) {
        elementModel.editElement(req.body)
            .then(response => {
                if (response.error) {
                    return responses.server(res)
                }
                res.status(200).json(response)
            })
            .catch(error => {
                responses.server(res)
            })
    } else {
        return responses.badRequest(res);
    }
}

exports.deleteElement = (req, res) => {
    if (!req.params.id) {
        return responses.badRequest(res);
    }
    elementModel.deleteElement(req.params.id)
        .then(response => {
            if (response.error) {
                return responses.server(res)
            }
            res.status(200).json(response)
        })
        .catch(error => {
            responses.server(res)
        })
}


const validateElement = (req) => {
    if (!req.body || !req.body.name || !req.body.type || !req.body.parent) {
        return false
    } else {
        return true;
    }
}