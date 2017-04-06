function tplawesome(e, t) {
	res = e;
	for (var n = 0; n < t.length; n++) {
		res = res.replace(/\{\{(.*?)\}\}/g, function(e, r) {
			return t[n][r]
		})
	}
	return res
}

$(function() {
	
	$("#submitttrailer").on("click", function(e) {
		var a = "latest telugu movie trailers";
		request(e,a);
	});
	
	$("#submithtrailer").on("click", function(e) {
		var a = "latest hindi movie trailers";
		request(e,a);
	});
	
	$("form").on("submit", function(e) {
		var a = $("#search").val();
		request(e,a);

	});
	
	// $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
	$(".video").css("height", $("#results").width() * 3 / 4);
}

function init() {
	gapi.client.setApiKey("AIzaSyBzFNuMS04NvTkKsLYnweQgPu_9d45vIvg");
	gapi.client.load("youtube", "v3", function() {
		// yt api is ready
	});
}

function request(x,p) {
	x.preventDefault();
	// prepare the request
	var request = gapi.client.youtube.search.list({
		part : "snippet",
		type : "video",
		q : encodeURIComponent(p).replace(/%20/g, "+"),
		maxResults : 5,
		order : "viewCount",
		publishedAfter : "2015-01-01T00:00:00Z"
	});
	// execute the request
	request.execute(function(response) {
		var results = response.result;
		$("#results").html("");
		$.each(results.items, function(index, item) {
			$.get("item.html", function(data) {
				$("#results").append(tplawesome(data, [ {
					"videoid" : item.id.videoId
				} ]));
			});
		});
		// resetVideoHeight();
	});
}