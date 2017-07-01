 var http = require('http');
var fs = require("fs");
var util = require("util");
var express = require("express");
var app = express();
var mongo = require("mongodb").MongoClient, format = require('util').format;
var path = require('path');



// create express server
app.listen(3000);
console.log("express server started at http://localhost:3000/");

// creating mongodb connection
var dbres;
mongo.connect('mongodb://127.0.0.1:27017/moviesDB', function(err, db) {
	if (err) {
		throw err;
		console.log("failed to connect to moviesDB");
	} else {

		db.collection('list').find({}).toArray(function(err, list) {
			if (err) {
				throw err;
			} else if (list.length) {
				// print results
				dbres=JSON.stringify(list);
				console.log(dbres);
			} else {
				console.log("list not exist")
			}
			
			db.close();
			
		});
	}
	
});

// express routing

app.get('/', function(req, res, next) {
	console.log("express home calles");
	res.sendFile("movie.html", {
		root : path.join(__dirname, './clientside')
	});
});

app.get('/movies/:id',function(req, res, next){
	console.log("called /movies/:id");
	console.log("id : "+req.params.id);
	res.sendFile("pg2.html",{
		root:path.join(__dirname,'./clientside')
	});
});

app.get('/movies/reqmovlis/:id',function(req,res,next){
	console.log("called /movies/reqmovlis/:id");
	console.log("id : "+req.params.id);
	
	var dbress;	
	var dbresjson=JSON.parse(dbres);
	console.log("the length of dbresjson is:"+dbresjson.length);
	for (var i = 0; i < dbresjson.length; i++) {
		if(dbresjson[i].mov_id==(req.params.id))
			{
			 dbress=dbresjson[i];
			 console.log("the json response of single movie is: "+dbresjson[i]);
			}
	}
	
	
	res.writeHead(200,{'Content-type':'application/json'});
	console.log("single responding json data from server :"+dbress);
	
    var moviedbs=JSON.stringify(dbress);
	console.log("single responding string data from server :"+moviedbs);
	res.end(moviedbs);
	
});

app.get('/movies/pg2.js', function(req, res, next) {
	console.log("called /movies/pg2.js");
	res.sendFile("pg2.js", {
		root : path.join(__dirname, './clientside')
	});
});

app.get('/logo.png', function(req, res, next) {
	res.sendFile("logo.png", {
		root : path.join(__dirname, './images')
	});
});

app.get('/movie.js', function(req, res, next) {
	// res.send("hai from express node");
	res.sendFile("movie.js", {
		root : path.join(__dirname, './clientside')
	});
});


app.get('/reqmovlis.html',function(req,res,next){
	console.log("/reqmovlis.html is called sucess fully");
	res.writeHead(200,{'Content-type':'application/json'});
	res.end(dbres);
	
});


app.get('/item.html', function(req, res, next) {
	// res.send("hai from express node");
	res.sendFile("item.html", {
		root : path.join(__dirname, './clientside')
	});
});

app.use("/movies/images/",express.static('images'));
app.use("/images/",express.static('images'));

app.get('*', function(req, res) {
	res.send("page not found", 404);
});

function getStaticFileContent(res, fp, contentType) {
	fs.readFile(fp, function(error, data) {
		if (error) {
			// console.log("fp error starting");
			res.writeHead(500, {
				'Content-Type' : 'text/plain'
			});
			res.end("500-Internal server error.");
			// console.log("fp error ending");
		}
		if (data) {
			// console.log("fp sucess starting");
			res.writeHead(200, {
				'Content-Type' : '*/*'
			});
			res.end(data);
			// console.log("fp sucess ending");
			// console.log("data is:"+data);
		}

	});
}

// function infoProcessor(req,res){
// res.send("hai you have reached server function");
// console.log("info is called sucessfully from function");
// }

