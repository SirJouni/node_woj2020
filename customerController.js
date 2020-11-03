'use strict'

// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost', // tietokantapelvelimen osoite
  user     : 'root',  // HUOM! Älä käytä root:n tunnusta tuotantokoneella!!!!
  password : '', // kehitystarkoiteuksessa voidaan käyttää root-käyttäjää
  database : 'asiakas_woj' // tai asiakas_woj
});

module.exports = 
{
    fetchTypes: function (req, res) {  
      connection.query('SELECT Avain, Lyhenne, Selite FROM Asiakastyyppi', function(error, results, fields){
        if ( error ){
          console.log("Virhe haettaessa dataa Asiakas-taulusta, syy: " + error);
          res.status(500); // tämä lähtee selmaille
          res.json({"status" : "ei toiminut"}); // ja tämä lähtee 
        }
        else
        {
          console.log("Data = " + JSON.stringify(results));
          res.json(results); // onnistunut data lähetetään selaimelle
        }
    });

    },

    fetchAll: function(req, res){
      // connetion.query...
      console.log("Body = " +JSON.stringify(req.body));
      console.log("Params = " +JSON.stringify(req.query));
      console.log(req.query.nimi); // jos tulee undefined, niin silloin
        
      res.send("Kutsuttiin fetchAll");
    },

    create: function(req, res){
      //connection.query
      console.log("Data = " +JSON.stringify(req.body));
      console.log(req.body.nimi);
    
      res.send("Kutsuttiin create");
    },

    update: function(req, res){

    },

    delete : function (req, res) {
      console.log("Body = " + JSON.stringify(req.body));
        console.log("Params = " + JSON.stringify(req.params));

        res.send("Kutsuttiin delete");
    }
}
