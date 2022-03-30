const express = require('express');
const router = express.Router();
const componentsController = require('../controllers/componentsController.js');

router
    .route('/')
        .post(componentsController.index);

router
    .route('/block')
        .post(componentsController.createBlock)
        .get(componentsController.getBlock)
        .delete(componentsController.deleteBlock)
        .update(componentsController.updateBlock)

router
    .route('/element')
        .post(componentsController.createElement)
        .get(componentsController.getElement)
        .delete(componentsController.deleteElement)
        .update(componentsController.updateElement)

module.exports = router;