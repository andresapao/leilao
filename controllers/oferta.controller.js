var Oferta = require('../models/oferta.model');
const mongoose = require('mongoose');
exports.create = function (req, res, next) {
    let registro = new Oferta(
        {quantidade: req.body.quantidade,
         data: new Date(),
         idProduto: req.body.idProduto}
        );
        registro.save(function (err) {
            if (err) {
                return next(err);
            }
            let produto = mongoose.model('Produto');
            produto.findById(registro.idProduto, function(err, retorno) {
              retorno.quantidadeEstoque -= registro.quantidade;
              retorno.save(function(err)
              {
                if (err) {
                  return next(err);
                }
              });
            });          
        });    
};
exports.list = function (req, res, next) {
    Oferta.find({}, function(err, records) {
        var list = {};
    
        records.forEach(function(record) {
          list[record._id] = record;
        });
    
        res.send(list);  
      });
    }
