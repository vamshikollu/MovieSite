$(function() {
	//step0: nav handler
	$("#submitmovies").on("click", function(e) {
		 a = "telugu movies";
		videoduration="long";
		request(e, a);
		
		console.log(a);
		console.log(e);
		console.log(sort);
	});
	
	$("#submitserials").on("click", function(e) {
		 a = "telugu serials";
		videoduration="medium";
		request(e, a);
	});
	
	$("#submitttrailer").on("click", function(e) {
		 a = "telugu trailers";
		videoduration="short";
		request(e, a);
	});
	
	$("#submitsongs").on("click", function(e) {
		 a = "telugu songs";
		videoduration="any";
		request(e, a);
	});
	
	$("#submitcomedy").on("click", function(e) {
		 a = "telugu comedy short film";
		videoduration="medium";
		sort="relevance";
		request(e, a);
	});

	$("#form").on("submit", function(e) {
		 a = $("#search").val();
		request(e, a);

	});
	
	// step1: request the server for movie details
	$.ajax({
		type : 'GET',
		url : '/reqmovlis.html',
		// data: JSON.stringify(data),
		success : function(resdata) {
			// redirect to step 2
			propagateCards(resdata);
		},
		error : function() {
			alert("error sendind data to /reqmovlis.html");
		}
	})

	// step 2: print the cards in the html page
	var propagateCards = function(resdata) {
		// console.log("called /reqmovlis.html from client sucess with res");
		// console.log("response data is "+ resdata[1].mov_name);
		var a = resdata.length;
		console.log("The length of resdata in client side as object is:"+a);
		for (var i = 0; i < resdata.length; i++) {
			console.log(resdata[i]);
			var $elem = $("#results");
			$elem
					.append('<div id="'
							+ resdata[i].mov_id
							+ '"  class="card" style="width:20rem;  ;display: inline-block;">   <img id="mov-icon" class="card-img-top" src="'
							+ resdata[i].mov_posterlink
							+ '" alt="Image not found">   </div></div>');
		if(i==(resdata.length-1))
			{
			$(".card").on('click',function(e) {
				console.log($(this).attr('id'));
				 var redirectUrl = "/movies/" + $(this).attr('id');
				 window.location.replace(redirectUrl);
			})
			}
		
		}
	}

	// logic for search in main page
	$("form").on("submit", function(e) {

		a = $("#search").val();
	});

	function resetVideoHeight() {
		$(".video").css("height", $("#results").width() * 3 / 4);
	}



	// step 3: when the user click on the card this function will redirect to
	// pg2
	$(window).load(function() {
	
	})
}); //close of main function









// this function will link to youtube api
function init() {
	gapi.client.setApiKey("AIzaSyBzFNuMS04NvTkKsLYnweQgPu_9d45vIvg");
	gapi.client.load("youtube", "v3", function() {
		// yt api is ready
	});
}


//handle the individual videos
function tplawesome(e, t) {
	res = e;
	for (var n = 0; n < t.length; n++) {
		res = res.replace(/\{\{(.*?)\}\}/g, function(e, r) {
			return t[n][r]
		})
	}
	return res
}


//request the youtube api

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
		location:"17.3850,78.4867",
		locationRadius:"999km",
		
	});
	
	// execute the request
	
	request.execute(function(response) {
		var results = response.result;
		$("#results").html("");
		$.each(results.items, function(index, item) {
			$.get("item.html", function(data) {
				$("#results").append(tplawesome(data, [ {
					"videoid" : item.id.videoId,
					"videotitle":item.snippet.title
				} ]));
			});
		});
		
	});
}



