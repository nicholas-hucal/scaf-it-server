const express = require('express');
const router = express.Router();
const componentsController = require('../controllers/componentsController.js');

router
    .route('/')
        .get(componentsController.index);

module.exports = router;