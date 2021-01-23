var express=require('express')// import modulul express
var path= require('path');

var mysql = require('mysql');

var conexiune = mysql.createConnection({
	host:"localhost",
	user:"gigel",
	password:"parola123",
	database:"tehnici_web"
});

conexiune.connect(function(err){
	if (err) throw err;
	console.log("Ne-am conectat!!! Yayyyyy!!");
});

conexiune.query("select * from produse", function(err, rezultat, campuri){
	if(err) throw err;
	console.log(rezultat);
})


var app=express();//aici am creat serverul

app.set('view engine', 'ejs');//setez drept compilator de template-uri ejs (setez limbajul in care vor fi scrise template-urile)


console.log(__dirname); //predefinita - calea pe masina serverului
console.log(path.join(__dirname, "resurse"));
// /stiluri/stil.css
app.use(express.static(path.join(__dirname, "resurse")));

// aici astept cereri de forma localhost:8080 (fara nimic dupa)
app.get('/', function(req, res){
	res.render('pagini/index');//afisez index-ul in acest caz
});

app.get('/produse', function(req, res){
	var a = "ionel"
	var b = "17"
	conexiune.query("select * from produse", function(err, rezultat, campuri){
		if(err)	throw err;
		console.log(rezultat);
		res.render('pagini/produse', {param_a:a, param_b:b, produse:rezultat}); //afisez indexul in acest caz
	})
	
})

app.get('/prod:abc', function(req, res){
	var idProd = req.params.abc;
	conexiune.query("select * from produse where id=" + idProd, function(err, rezultat, campuri){
		if(err)	throw err;
		console.log(rezultat);
		res.render('pagini/pag_produs', {produs:rezultat[0]}); //afisez indexul in acest caz
	})
	
})



// app.get('/produse', function(req, res){
// 	var a="ionel";
// 	var b="17";
// 	conexiune.query("select * from produse",function(err, rezultat, campuri){
// 		if(err) throw err;
// 		console.log(rezultat);
// 		res.render('pagini/produse',{param_a:a, param_b:b, produse:rezultat});//afisez index-ul in acest caz
// 	});

// });


app.get('/prod/:abc', function(req, res){
	var idProd=req.params.abc;
	conexiune.query("select * from produse where id="+idProd,function(err, rezultat, campuri){
		if(err) throw err;
		console.log(rezultat);
		res.render('pagini/pag_produs',{ produs_unic:rezultat[0]});//afisez index-ul in acest caz
	});

});



app.get(/^\/z{2,4}$/, function(req, res){
	res.setHeader("Content-Type", "text/html");
	res.write("<html><body><p style='color:red;'>zzzzzzz</p>");
	
	res.write("</body></html>");
	res.end();
});



app.get(/^\/[a-z]+[0-9]+[a-z]+$/, function(req, res){
	res.setHeader("Content-Type", "text/html");
	res.write("<html><body><p style='color:red;'>exercitiu</p>");
	
	res.write("</body></html>");
	res.end();
});



//cerere serviciu
// Luni, 9 noiembrie, 2020, ora: hh:mm:ss
//si luna sa fie scrisa cu bold <b>
app.get('/ora_server', function(req, res){
	res.setHeader("Content-Type", "text/html");
	res.write("<html><body><p style='color:red;'>Salut, Gigele!</p>");
	var d=new Date();
	//res.write(d+""); conversie implicita la sir
	res.write(d.getFullYear()+"/"+d.getMonth());
	res.write("</body></html>");
	res.end();
});



//aici astept orice tip de cerere (caracterul special * care tine loc de orice sir)
app.get('/*', function(req, res){
	
	res.render('pagini/'+req.url, function(err, rezRandare){
		if(err){//intra doar cand avem eroare
			if(err.message.includes("Failed to lookup view"))
				res.status(404).render('pagini/404');
			else
				throw err;
		}
		else{
			console.log(rezRandare);
			res.send(rezRandare);
		}
	});//afisez pagina ceruta dupa localhost:8080
	//de exemplu pentru localhost:8080/pag2 va afisa fisierul /pag2 din folderul pagini
	console.log(req.url);//afisez in consola url-ul pentru verificare
});

app.listen(8080);//serverul asculta pe portul 8080
console.log("A pornit serverul pe portul 8080");//afisez in consola un mesaj sa stiu ca nu s-a blocat