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
        // .delete(componentsController.deleteBlock)
        .put(componentsController.editBlock)

router
    .route('/element')
        .post(componentsController.createElement)
        .get(componentsController.getElement)
        // .delete(componentsController.deleteElement)
        // .put(componentsController.updateElement)

module.exports = router;