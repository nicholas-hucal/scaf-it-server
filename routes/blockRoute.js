const express = require('express');
const router = express.Router();
const blockController = require('../controllers/blockController.js');

router
    .route('/')
        .post(blockController.createBlock)
        .get(blockController.getBlock)
        .put(blockController.editBlock)
router
    .route('/:id')
        .delete(blockController.deleteBlock)

module.exports = router;