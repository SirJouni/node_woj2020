// npm install express
// npm install handlebars
// npm install consolidate

var express = require('express');
var cons = require('consolidate');
var app = express();
var path = require('path');
var customerController = require('./customerController');


// Tulosta konsoliin mahdolliset enginet
//console.log(cons);

app.engine('html', cons.handlebars); // Tällä otetaan käyttöön handlebars
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));


var usersFromServer = [];
usersFromServer.push({name: 'Matti'});
usersFromServer.push({name: 'Ville'});
usersFromServer.push({name: 'Pena'});

var customersFromServer = [];
customersFromServer.push({Nimi : "Testi", Osoite : "Testikuja 3", Postinro:"70700", Postitmp: "Kuopio", Tyyppi : 1});

app.get('/', function(req, res) {
    res.render('index', {
        title :"Hieno otsikko",
        subtitle : "On tämäkin alaotsikko"
    });
  });



  app.get('/customers', function(req, res) {
    customerController.fetchCustomersRevised().then(function(data){
        console.log("Customers " + JSON.stringify(data));
        return data;
    }).then((customers) => {
        return customers;
    }).catch(function(msg){
        console.log(msg);
    }).then(function(customers){
        res.render('customers', { // customers.html
            customers: customers // Jälkimmäinen on nyt se nuolimuuttujan parametri
        });        
    }) 
  });
    
app.get('/users', async function(req, res) {

    var types = null;
    try {
        types = await customerController.fetchTypesRevised(); // asynkronisia pyyntöjä
        console.log("tyypit haettu");
    }
    catch(error){
        console.log("EI onnistunut");
    }
    if ( types == null ) types = [{ Avain:-1, Lyhenne: "KAIKKI", Selite: "Tyhyjä" }];
        res.render('users', { // Haetaan näkymistä users.html, jonne renderöidään alla olevat tiedot:
            title: 'Users',
            subtitle: 'best',
            users: usersFromServer, // syötetään sisään lista, joka määritettiin rivillä 20-23
            languages: ['englanti', 'suomi', 'ruotsi'],
            types : types
        });       

    /* Toinen tapa hoitaa sama asia: .then odottaa aina edellisen suorituksen
    customerController.fetchTypesRevised().then(function(data){
        console.log("types = " + JSON.stringify(data));
        return data;    
    })
    .then((types) => {
        return types;
    })
    .catch(function(msg){
        console.log("Virhettä pukkaa " + msg);
    })
    .then((types) => {
        // suoritetaan vaikka tulis virhe
        if ( types == null ) types = [{ Avain:-1, Lyhenne: "KAIKKI", Selite: "Tyhyjä" }];
        res.render('users', {
            title: 'Users',
            subtitle: 'best',
            users: customerController.fetchUsers,
            languages: ['englanti', 'suomi', 'ruotsi'],
            types : types
        });        
    });
    */
});

app.listen(3003);
console.log('Express server listening on port 3003');

