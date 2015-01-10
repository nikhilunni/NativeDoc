originalUrl = window.location.href;
var index = window.location.href.indexOf("?url=");
url = window.location.href.substring(index+5, window.location.href.length-14);
history.replaceState({}, "NativeDoc", "/nativeDoc")

$(".ndfHFb-c4YZDc-aSZUA-Wrql6b").remove();
dl_url = chrome.extension.getURL('dl.jpg');
save_url = chrome.extension.getURL('save.jpg')

// <div id='save' style='float:left' class='btn-l'><img class='icon' src='"+save_url+"'></div>
$("body").append("<div class='toolbar'><div id='download' style='float:right' class='btn-r'><img class='icon' src='"
    +dl_url+"'></div></div>")


$(document).ready(function() {

	$('#download').click(function(){

		window.location.href = url;
	})

	$(document).keydown(function(event) {
        // If Control or Command key is pressed and the S key is pressed
        // run save function. 83 is the key code for S.
        if((event.ctrlKey || event.metaKey) && event.which == 83) {
            // Save Function
            $('#download').click();
            event.preventDefault();
        };
    });

    $(document).keydown(function(event) {
        // If Control or Command key is pressed and the S key is pressed
        // run save function. 83 is the key code for S.
        if((event.ctrlKey || event.metaKey) && event.which == 82) {
            // Save Function
            window.location.href = originalUrl;
            event.preventDefault();
        };
    });

    $(document).keydown(function(event) {
        // If Control or Command key is pressed and the S key is pressed
        // run save function. 83 is the key code for S.
        if((event.ctrlKey || event.metaKey) && event.which == 80) {
        	return true;
        };
    });

    e = jQuery.Event("keydown");        
	e.which = 80;
	e.ctrlKey = true;
	e.metaKey = true;
	$("html").trigger(e);
});
