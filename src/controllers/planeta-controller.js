'use strict';

const https = require('https');
const Validation = require('../validators/validator');
const repository = require('../repositories/planeta-repository');

// Adicionar um planeta (com nome, clima e terreno)
exports.post = async (req, res, next) => {
    const validator = new Validation();
    validator.isRequired(req.body.nome, 'O nome e obrigatório.');
    validator.isRequired(req.body.clima, 'O clima e obrigatório.');
    validator.isRequired(req.body.terreno, 'O terreno e obrigatório.');

    // Se os dados forem inválidos
    if (!validator.isValid()) {
        res.status(400).send(validator.errors()).end();
        return;
    }

    // Busca as aparições em filmes 
    await swapi('https://swapi.co/api/planets/?search=' + req.body.nome).then(function (result) {
        if (result !== undefined) {
            req.body.aparicoes_filmes = result['films'].length;
        }
    });

    try {
        await repository.create({
            nome: req.body.nome,
            clima: req.body.clima,
            terreno: req.body.terreno,
            aparicoes_filmes: req.body.aparicoes_filmes
        });
        res.status(201).send({
            message: 'Planeta Cadastrado com Sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }

};

// Listar planetas
exports.get = async (req, res, next) => {
    try {
        res.status(200).send(await repository.get());
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

// Buscar por nome
exports.getByNome = async (req, res, next) => {
    try {
        res.status(200).send(await repository.getByNome(req.params.nome));
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

// Buscar por ID
exports.getById = async (req, res, next) => {
    try {
        res.status(200).send(await repository.getById(req.params.id));
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

// Remover planeta
exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Planeta Removido com Sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

let swapi = async (url) => {
    try {
        return await new Promise(function (resolve, reject) {
            https.get(url, function (resp) {
                var data = '';

                resp.on('data', function (chunk) {
                    data += chunk;
                });

                resp.on('end', function () {
                    var result = JSON.parse(data)['results'][0];
                    resolve(result);
                });
            }).on("error", function (err) {
                reject(err);
            });
        });

    } catch (e) {
        console.log(e);
    }
};