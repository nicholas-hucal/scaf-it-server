const e = require('express');
const blockModel = require('../models/blockModel.js');
const responses = require('../utils/responses.js');

exports.createBlock = (req, res) => {
    if(validateBlock(req)) {
        blockModel.createBlock(req.body)
            .then(response => {
                if (response.error) {
                    return responses.server(res)
                }
                res.status(201).json(response)
            })
            .catch(error => {
                responses.server(res);
            })
    } else {
        return responses.badRequest(res);
    }
}

exports.getBlock = (req, res) => {
    if(validateBlock(req)) {
        blockModel.getBlock(req.body)
            .then(response => {
                if (response.error) {
                    return responses.server(res)
                }
                res.status(200).json(response)
            })
            .catch(error => {
                responses.server(res);
            })
    } else {
        return responses.badRequest(res);
    }
}

exports.editBlock = (req, res) => {
    if(validateBlock(req)) {
        blockModel.editBlock(req.body)
            .then(response => {
                if (response.error) {
                    return responses.server(res)
                }
                res.status(200).json(response)
            })
            .catch(error => {
                responses.server(res);
            })
    } else {
        return responses.badRequest(res);
    }
}

exports.deleteBlock = (req, res) => {
    if (!req.params.id) {
        return responses.badRequest(res);
    }
    blockModel.deleteBlock(req.params.id)
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

const validateBlock = (req) => {
    if (!req.body || !req.body.name || !req.body.user_id || !req.body.type) {
        return false
    } else {
        return true;
    }
}