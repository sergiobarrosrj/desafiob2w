'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./configApp');

const app = express();
const router = express.Router();

// Connecta ao banco
mongoose.connect(config.connectionString, { useNewUrlParser: true });

// Carrega os Models
const Planeta = require('./models/planeta');

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const planetaRoute = require('./routes/planeta-route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/planeta', planetaRoute);

module.exports = app;