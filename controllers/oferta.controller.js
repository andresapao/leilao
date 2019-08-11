var Oferta = require('../models/oferta.model');
const mongoose = require('mongoose');
exports.create = async function (req, res, next) {
    let registro = new Oferta(
        {quantidade: req.body.quantidade,
         data: new Date(),
         idProduto: req.body.idProduto}
        );
    const session = await mongoose.startSession();
    session.startTransaction();
    registro.save(function(erroOferta)
    {
      atualizaEstoqueProduto(registro.idProduto, registro.quantidade, function(erroProduto, retorno)
      {
        if(erroProduto)
        {
          res.status(500).send(erroProduto);
          next(erroProduto);
        }
        else
        {
          session.commitTransaction();
          session.endSession();
          res.send('Produto agora com saldo de ' + retorno.quantidadeEstoque);
        }
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
async function atualizaEstoqueProduto(idProduto, quantidadeConsumida, callback)
{
  let produto = mongoose.model('Produto');
  produto.findById(idProduto, function(err, retorno) {
    retorno.quantidadeEstoque -= quantidadeConsumida;
    retorno.save(function(erroProduto, result)
    {
        callback(erroProduto, result);
    });
  });          
}