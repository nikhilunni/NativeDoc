console.log("bar");
$(".ndfHFb-c4YZDc-aSZUA-Wrql6b").remove();
$("body").append("<a id='download' style='' target='_parent'>Download</a>")

var index = window.location.href.indexOf("?url=");
url = window.location.href.substring(index+5, window.location.href.length-14);

$(document).ready(function() {

	$('#download').click(function(){

		window.location.href = url;
	})



});
