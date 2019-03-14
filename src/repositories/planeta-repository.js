'use strict';
const mongoose = require('mongoose');
const Planeta = mongoose.model('Planeta');

exports.create = async (data) => {
    var planeta = new Planeta(data);
    await planeta.save();
};

exports.get = async () => {
    return await Planeta.find({}, 'nome clima terreno aparicoes_filmes');
};

exports.getByNome = async (nome) => {
    return await Planeta
        .findOne({
            nome: nome
        }, 'nome clima terreno aparicoes_filmes');
};

exports.getById = async (id) => {
    return await Planeta.findById(id);
};

exports.delete = async (id) => {
    await Planeta.findByIdAndDelete(id);
};