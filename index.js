
const express = require('express');
const bodyParser = require('body-parser');
// inicializar app express
const app = express();
var cluster = require('cluster');

if (cluster.isMaster) {
    for (var i = 0; i < 4; i++) {
        cluster.fork();
    }

    cluster.on('exit', function (worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');        
        cluster.fork();
    });
    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is listening');
    });    
}
else {
    const produto = require('./routes/produto.route'); 
    const oferta = require('./routes/oferta.route'); 
    var timeout = require('connect-timeout'); 
    const mongoose = require('mongoose');
    const http = require('http');

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
    mongoose.set('debug', true);


    app.server = http.createServer(app);    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
    app.use('/produtos', produto);
    app.use('/ofertas', oferta);
    app.use(timeout(30000));    
    let porta = 8000;
    app.server.listen(porta, () => {
        console.log('Servidor em execução na porta ' + porta);
    });

}
