const componentsModel = require('../models/componentsModel.js');
const responses = require('../utils/responses.js');

exports.getComponent = (req, res) => {
    if (validateComponent(req)) {
        componentsModel.getComponent(req.body)
            .then(response => {
                if (response.error) {
                    return responses.server(res)
                }
                res.status(200).json(response);
            })
            .catch(err => {
                responses.server(res)
            })
    } else {
        return responses.badRequest(res);
    }
};

exports.deleteComponent = (req, res) => {
    if (req.params.id !== '') {
        componentsModel.deleteComponent(req.params.id)
            .then(response => {
                if (response.error) {
                    return responses.server(res)
                }
                res.status(200).json(response);
            })
            .catch(err => {
                responses.server(res)
            })
    } else {
        return responses.badRequest(res);
    }
};

exports.getComponentsByUserId = (req, res) => {
    if (req.user) {
        componentsModel.getComponentsByUserId(req.user.id)
            .then(response => {
                if (response.error) {
                    return responses.server(res)
                }
                res.status(200).json(response);
            })
            .catch(err => {
                responses.server(res)
            })
    } else {
        return responses.notAuthorized(res);
    }
}

exports.createArchive = (req, res) => {
    if (validateComponent(req)) {
        componentsModel.createArchive(req.body)
            .then(response => {
                if (response.error) {
                    return responses.server(res)
                }
                res.status(200).json(response);
            })
            .catch(err => {
                responses.server(res)
            })
    } else {
        return responses.badRequest(res);
    }
};

const validateComponent = (req) => {
    if (!req.body || !req.body.name || !req.body.user_id || !req.body.type) {
        return false
    } else {
        return true;
    }
}