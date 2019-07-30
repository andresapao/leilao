const express = require('express');
const router = express.Router();
// Colocar controller que ainda não foi criado
const produto_controller = require('../controllers/produto.controller');
// teste simples
router.get('/testar', produto_controller.test);
router.get('/', produto_controller.list);
router.get('/:id', produto_controller.details);
router.post('/create', produto_controller.create);
module.exports = router;