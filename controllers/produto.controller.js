var Produto = require('../models/produto.model');
exports.test = function (req, res) {
    res.send('Olá! Teste ao Controller');
};
exports.create = function (req, res, next) {
    let produto = new Produto(
        {nome: req.body.nome,
         marca: req.body.marca}
        );
        produto.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send('Registo de produto criado com sucesso');
        });    
};
exports.list = function (req, res, next) {
    Produto.find({}, function(err, records) {
        var list = {};
    
        records.forEach(function(record) {
          list[record._id] = record;
        });
    
        res.send(list);  
      });
    }
exports.details = function (req, res, next) {
    Produto.findById(req.params.id, function (err, product) {
    if (err) return next(err);
        res.send(product);
    })
};