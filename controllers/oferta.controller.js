var Oferta = require('../models/oferta.model');
exports.create = function (req, res, next) {
    console.log(req);
    let registro = new Oferta(
        {quantidade: req.body.quantidade,
         data: new Date(),
         idProduto: req.body.idProduto}
        );
        registro.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send('Registo de oferta criado com sucesso');
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
