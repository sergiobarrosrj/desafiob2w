'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    clima: {
        type: String,
        required: true,
        trim: true
    },
    terreno: {
        type: String,
        required: true,
        trim: true
    },
    aparicoes_filmes: {
        type: String,
        default: 0
    }
});

module.exports = mongoose.model('Planeta', schema);