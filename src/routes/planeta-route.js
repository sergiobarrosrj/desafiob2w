'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/planeta-controller');

router.get('/', controller.get);
router.get('/:nome', controller.getByNome);
router.get('/admin/:id', controller.getById);
router.post('/', controller.post);
router.delete('/', controller.delete);

module.exports = router;