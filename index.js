var express = require('express') // import modulul express
var path = require('path');

var mysql = require('mysql');


var conexiune = mysql.createConnection({
    host:"localhost",
    user:"gigel",
    password:"parola123",
    database:"tehnici_web"
});

conexiune.connect(function(err){
    if(err) throw err;
    console.log("Ne-am conectat! Yeeee");
});

conexiune.query("SELECT * FROM produse", function(err, rezultat, campuri){
   if(err) throw err;
   console.log(rezultat);
});

var app = express();
app.set('view engine', 'ejs');//setez drept compilator de template-uri ejs (setez limbajul in care vor fi scrise template-urile)


app.use(express.static(__dirname));

//cereri de forma localhost:8080(fara nimic dupa)
app.get('/', function(req, res){
    res.render('pagini/index');//afisez indexul
});

app.get('/produse', function(req, res){
    var a = "ionel";
    var b = "17";
    conexiune.query("SELECT * FROM produse", function(err, rezultat, campuri){
        if(err) throw err;
        console.log(rezultat);
        res.render('pagini/produse',{param_a:a, param_b:b, produse:rezultat});//afisez index-ul in acest caz
     });     
});

app.get('/prod/:abc', function(req, res){
    var idProd=req.params.abc;
    conexiune.query("SELECT * FROM produse WHERE id = "+idProd, function(err, rezultat, campuri){
        if(err) throw err;
        console.log(rezultat);
        res.render('pagini/pag_produs',{produs_unic:rezultat[0]});//afisez index-ul in acest caz
     });     
});

window.onload = function(){
    document.getElementById("buton-sortare-asc").onclick = function(){
        var fer = window.open("https://www.w3schools.com/","");
    }
}

app.listen(8080);
console.log("A pornit serverul pe portul 8080")