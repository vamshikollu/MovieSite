function tplawesome(e, t) {
	res = e;
	for (var n = 0; n < t.length; n++) {
		res = res.replace(/\{\{(.*?)\}\}/g, function(e, r) {
			return t[n][r]
		})
	}
	return res
}
var a;
var videoduration;
//jquery onload will run this function

$(function() {
	
	var propagateCards=function(resdata){
		 console.log("called /reqmovlis.html from client sucess with res");
		 console.log("response data is "+ resdata[1].mov_name);
	
		var a=resdata.length;
		 for(var i=0;i<resdata.length;i++)
			 {
			 console.log(resdata[i]);
			 var $elem = $("#results");
			    $elem.append('<div class="card" style="width:20rem;"> <img class="card-img-top" src="'+resdata[i].mov_posterlink+'" alt="Card image cap">  <div class="card-block">    <div class="mov">'+resdata[i].mov_name+'</div>    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>    <a href="#" class="btn btn-primary">Go somewhere</a>  </div></div>');
			 }
	}

	//step1: request the server for movie details
	 $.ajax({
		 type: 'GET',
		 url:'/reqmovlis.html',
		 //data: JSON.stringify(data),
		 success: function(resdata){
			 propagateCards(resdata);
		
				//step2: create and paste cards on body of main page
			 // for each JSON object 
			 

		 },
		 error:function(){
			 alert("error sendind data to /reqmovlis.html");
		 }
	 })
	  
	 
	$("#submitmovies").on("click", function(e) {
		a = "telugu movies";
		videoduration = "long";
		request(e, a);

		console.log(a);
		console.log(e);
		console.log(sort);
	});

	$("#submitttrailer").on("click", function(e) {
		a = "telugu trailers";
		videoduration = "short";
		request(e, a);
	});

	$("#submitsongs").on("click", function(e) {
		a = "telugu songs";
		videoduration = "any";
		request(e, a);
	});

	$("#submitcomedy").on("click", function(e) {
		a = "telugu comedy short film";
		videoduration = "medium";
		sort = "relevance";
		request(e, a);
	});
	$("form").on("submit", function(e) {

		a = $("#search").val();

		request(e, a);

	});

	// $(window).on("resize", resetVideoHeight);
});
//console.log(a);

//console.log(sort);



function resetVideoHeight() {
	$(".video").css("height", $("#results").width() * 3 / 4);
}

function init() {
	gapi.client.setApiKey("AIzaSyBzFNuMS04NvTkKsLYnweQgPu_9d45vIvg");
	gapi.client.load("youtube", "v3", function() {
		// yt api is ready
	});
}

// var sort=document.getElementById("filter").value;
var sort = "ViewCount";

function request(x, p) {
	x.preventDefault();
	// prepare the request
	var request = gapi.client.youtube.search.list({
		part : "snippet",
		type : "video",
		q : encodeURIComponent(p).replace(/%20/g, "+"),
		maxResults : 10,
		order : sort,
		publishedAfter : "2016-01-01T00:00:00Z",
		videoDuration : videoduration,
		location : "17.3850,78.4867",
		locationRadius : "999km",

	});
	// execute the request

	request.execute(function(response) {
		var results = response.result;
		$("#results").html("");
		$.each(results.items, function(index, item) {
			$.get("item.html", function(data) {
				$("#results").append(tplawesome(data, [ {
					"videoid" : item.id.videoId,
					"videotitle" : item.snippet.title
				} ]));
			});
		});
		// resetVideoHeight();
	});
}