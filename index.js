
const express = require('express');
const bodyParser = require('body-parser');
// inicializar app express
const app = express();


const produto = require('./routes/produto.route'); // Importa rota
app.use('/produtos', produto);

// Configurar acesso à BD.
const mongoose = require('mongoose');
let url = 'mongodb://localhost:27017/sampleProductApp';
let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na Ligação ao MongoDB'));
db.on('connected', function()
{
    console.log("database sucessfully connected");
})
db.once('open', function() {
    console.log("we're connected!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', produto);

let porta = 8000;
app.listen(porta, () => {
    console.log('Servidor em execução na porta ' + porta);
});
