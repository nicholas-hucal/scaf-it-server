require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.static('./public'));
app.use(express.json());

// ROUTES
const homeRoute = require('./routes/homeRoute.js');
app.use('/', homeRoute);

// LISTEN
app.listen(process.env.PORT, () => {
    console.log('Capstone Server Rolling');
})