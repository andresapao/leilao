const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let OfertaSchema = new Schema({
    data: {type: Date, required: true},
    idProduto: {type: Schema.Types.ObjectId, ref: 'Produto'},
    quantidade: { type: Number, min: 1,  validate: {
        validator: function(valor) {
            let ProductInStock = mongoose.model('Produto');  
            return ProductInStock.countDocuments({'quantidadeEstoque': {$gt:valor}}).then(reg => reg > 0);
        }   
    }}
});
// Exportar o modelo
module.exports = mongoose.model('Oferta', OfertaSchema);