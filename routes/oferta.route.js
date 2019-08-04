const express = require('express');
const router = express.Router();
// Colocar controller que ainda não foi criado
const oferta_controller = require('../controllers/oferta.controller');
// teste simples
router.get('/', oferta_controller.list);
router.post('/create', oferta_controller.create);
module.exports = router;