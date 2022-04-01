const express = require('express');
const router = express.Router();
const elementController = require('../controllers/elementController.js');

router
    .route('/')
        .post(elementController.createElement)
        .get(elementController.getElement)
        .put(elementController.editElement)
router
    .route('/:id')
        .delete(elementController.deleteElement)

module.exports = router;