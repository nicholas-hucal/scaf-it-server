const express = require('express');
const router = express.Router();
const componentsController = require('../controllers/componentsController.js');

router
    .route('/')
        .post(componentsController.getComponent)
        .get(componentsController.getComponentsByUserId)

router
    .route('/create')
        .post(componentsController.createArchive);

module.exports = router;