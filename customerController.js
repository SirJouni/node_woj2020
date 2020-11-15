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
      //var  sql = 'SELECT avain, lyhenne, selite FROM Asiakastyyppi';
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
      //var sql = 'select * from jotain where 1 = 1 and name like "'+ "Kalle" +'%"'
      var sql = 'SELECT avain, nimi, osoite, postinro, postitmp, luontipvm FROM Asiakas WHERE 1 = 1';
      if (req.query.nimi != null) {
        sql = sql + " AND nimi like '" +req.query.nimi + "%'";
          console.log(req.query.nimi);
      }
      if (req.query.osoite != null) {
        sql = sql + " AND osoite like '" +req.query.osoite + "%'";
        console.log(req.query.osoite);
      }
      if (req.query.asty_avain != null) {
        sql = sql + " AND asty_avain like '" +req.query.asty_avain + "%'";
        console.log(req.query.asty_avain);
      }
      //if (onkoJokuParametri undefined) jos ei, niin sitten öisätään sen tiedot 'and name like "" +'
      //sql = sql + "and name like..."
      
      connection.query(sql, function(error, results){
        if( error ){
          console.log("Virhe haettaessa data Asiakas-taulusta " + error);
          res.status(500);
          res.json({"status" : "ei toiminut"});
        }
        else{
          console.log("Data = " + JSON.stringify(results));
          res.json(results); // onnistunut data lähetetään selaimelle
        }
      });
      
      // connetion.query(sql, function(error, result...))
      //console.log("Body = " +JSON.stringify(req.body));
      //console.log("Params = " +JSON.stringify(req.query));
      //console.log(req.query.nimi); // jos tulee undefined, niin silloin ei ole nimi avainta
        
      //res.send("Kutsuttiin fetchAll");
    },

    create: function(req, res){
      var sql = 'INSERT INTO asiakas (nimi, osoite, postinro, postitmp, luontipvm, asty_avain) VALUES ("'+req.body.nimi+'", "'+req.body.osoite+'", "'+req.body.postinro+'", "'+req.body.postitmp+'", "2020-11-13", '+req.body.asty_avain+')';
      //var sql = 'INSERT INTO asiakas (nimi, osoite, postinro, postitmp, luontipvm, asty_avain) VALUES ("Testi Testinen2", "Microkatu 1", "70100", "Kuopio", "2020-11-13", 1)';
      connection.query(sql, function (error, results, fields) {
      //console.log(JSON.stringify(req.query));
      //connection.query
      // INSERT INTO asiakas (nimi, osoite, postinro, postitmp, luontipvm, asty_avain)
      // VALUES ("Testi Testinen", "Microkatu 1", "70100", "Kuopio", getdate(), 1)
      //console.log("Data = " +JSON.stringify(req.body));
      //console.log(req.body.nimi); // jos tulee inecuei, niin ei avain muuttuujaa
      //req.json({"status" : "ok", "status_text" : "huhhuh"});
      //res.send("kutsuttiin ");
    
      //res.send("Kutsuttiin create");

      //VALUES ("")
      if( error ){
          console.log("Virhe haettaessa dataa Asiakastyyppi-taulusta: " +error);
          res.status(500); // Tämä lähtee selaimelle
          res.json({"status" : "ei toiminut"});
      } 
      else {
        console.log("Data = " +JSON.stringify(results));
        res.json(results);
        //res.json({"status" : "ok"}); //onnistunut data lähetetään selimelle(tai muualle)
      }
    //});
    //INSERT INTO asiakas(nimi, osoite, postinro, postitmp, luontipvm, asty_avain)
    //VALUES("Testi Testinen", "Microkatu 1", "71800", "Siilinjarvi", CAST(GETDATE() AS Date), 1)
    //riittää kuvankaappaus postmanista
    console.log("Data = " + JSON.stringify(req.body));
    console.log(req.body.nimi);
    res.send("Kutsuttiin create");
    })
    },

    update: function(req, res){

    },

    delete : function (req, res) {
      var sql = 'DELETE FROM asiakas WHERE avain = ' +req.params.id;

      connection.query(sql, function (error, results, fields) {
        if( error ){
          console.log("Virhe poistaessa asiakastyyppia: " +error);
          res.status(500); // Tämä lähtee selaimelle, emt mita tahan laiittaa
          res.json({"status" : "ei toiminut"});
        } 
        else {
          console.log("Data = " +JSON.stringify(results));
          res.json({"status" : "ok"}); //onnistunut data lähetetään selimelle(tai muualle)
        }
      })

      console.log("Body = " + JSON.stringify(req.body));
      console.log("Params = " + JSON.stringify(req.params.id));

      res.send("Kutsuttiin delete");
    },

    fetchCustomers: function(req, res) {
      console.log(req.query.asty_avain);
      var sql = 'SELECT avain, nimi, osoite, postinro, postitmp, luontipvm, asty_avain FROM asiakas where 1= 1';
      if(req.query.nimi != null && req.query.nimi != ""){
          sql = sql + " and nimi like '" +req.query.nimi + "%'";
      }
      if(req.query.osoite != null && req.query.osoite != ""){
          sql = sql + " and osoite like '" + req.query.osoite + "%'";
      }
      if(req.query.asty_avain != null && req.query.asty_avain != ""){
          sql += " and asty_avain=" +req.query.asty_avain;
      }

      connection.query(sql, function(error, results, fields){
        if( error ){
          console.log("Virhe haettaessa Asiakas-taulusta: " +error);
          res.status(500); // Tämä lähtee selaimelle, emt mita tahan laiittaa
          res.json({"status" : "ei toiminut"});
        } 
        else {
          console.log("Data = " +JSON.stringify(results));
          res.json({"status" : "ok"}); //onnistunut data lähetetään selimelle(tai muualle)
        }
      })
    }
}
