const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ProdutoSchema = new Schema({
    nome: {type: String, required: true, max: 100},
    marca: {type: String, required: true},
    img: { data: Buffer, contentType: String }
});
// Exportar o modelo
module.exports = mongoose.model('Produto', ProdutoSchema);