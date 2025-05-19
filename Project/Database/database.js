const mongoose = require('mongoose');

/*Stringa di connesione per il database*/
const connectionString = 'mongodb://localhost:27017/Cards_Game';

mongoose.Promise = global.Promise;

connection = mongoose.connect(connectionString, {
    //useNewUrlParser: true,//Mongoose di utilizzare il nuovo parser di URL introdotto nella versione 3.0 di MongoDB Node.js driver.
    //useUnifiedTopology: true,// Consente un miglior supporto delle funzionalità moderne di MongoDB (come le transazioni) e riduce i warning.
    checkServerIdentity: false,//Questa opzione viene passata al driver MongoDB per controllare se verificare l'identità del server durante una connessione SSL/TLS.
    family :4// indirizzi ip di tipologia IPv4
})
    .then(()=>{
        console.log('Connected to Database!');
    })
    .catch((err)=>{
        console.error('Database not connected because :\n'+JSON.stringify(err));
    });