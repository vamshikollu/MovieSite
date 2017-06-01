var http = require('http');
var fs = require("fs");
var util = require("util");
var express = require("express");
var app = express();
var mongo = require("mongodb").MongoClient, format = require('util').format;
var path = require('path');

// creating server
http.createServer(onRequest).listen(5245);
console.log('Server running at http://localhost:5245/');

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
//console.log("the db value is :",dbres);

// node routing
function onRequest(req, res) {
	var url = req.url;
	// res.writeHead(200, {'Content-Type': 'text/plain'});
	// res.writeHead('Hello vamshi from server\n');
	switch (url) {
	case '/':
		// console.log("A user made a request to:"+req.url);
		getStaticFileContent(res, "clientside/main.html", 'text/html');
		// console.log("sucess home");
		// getStaticFileContent(res,"clientside/scripts.js",'html/javascript');
		break;

	case '/scripts.js':
		// console.log("A user made a request to:"+req.url);
		getStaticFileContent(res, "clientside/scripts.js", 'text/javascript');
		// console.log("sucess scripts");
		break;
	// res.writeHead(404,{'content-type':'text/javascript'});
	// res.end();

	case '/movie.js':
		// console.log("A user made a request to:"+req.url);
		getStaticFileContent(res, "clientside/movie.js", 'text/javascript');
		// console.log("sucess scripts");
		break;
	case '/item.html':
		// console.log("A user made a request to:"+req.url);
		getStaticFileContent(res, "clientside/item.html", 'text/html');
		// console.log("sucess scripts");
		break;
	case '/info':
		console.log("info is called sucessfully" + req);

		console.log('Request received: ');
		var consData = {
			'uday' : 0,
			'vamshi' : 1
		}
		// res.end(JSON.stringify(data));
		req.on('data', function(request) {
			requestObject = JSON.parse(request);
			console.log('Request DATA!::' + requestObject);
			// console.log("the data we resived is:"+JSON.stringify(data));
			var t = consData[requestObject.name];
			console.log("name is" + requestObject.name);

			if (t == undefined)
				consData[requestObject.name] = 1;
			else
				consData[requestObject.name] = t + 1;
			res.writeHead(200, {
				'Content-Type' : 'application/json'
			});
			res.end(JSON.stringify(consData));

		});

		console.log("info ending");
		// res.send("hai you have reached server function");
		break;

	case '/movie':
		getStaticFileContent(res, "clientside/movie.html", 'text/html');
		break;
	case '/images/logo.png':
		getStaticFileContent(res, "images/logo.png", 'image/png');
		break;
	default:
		// console.log("default starting");
		// console.log("A user made a request to:"+req.url);
		res.writeHead(404, {
			'content-type' : 'text/plain'
		});
		res.end("404-page not found");
		// console.log("default ending");
	}
}

// express routing


app.get('/', function(req, res, next) {
	console.log("express home calles");
	
	// res.send("hai from express node");
	res.sendFile("movie.html", {
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
app.get('/item.html', function(req, res, next) {
	// res.send("hai from express node");
	res.sendFile("item.html", {
		root : path.join(__dirname, './clientside')
	});
});
app.get('/reqmovlis.html',function(req,res,next){
	console.log("/reqmovlis is called sucess fully");
	res.writeHead(200,{'Content-type':'application/json'});
	res.end(dbres);
	
})
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

