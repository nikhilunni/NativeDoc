originalUrl = window.location.href;

var index = window.location.href.indexOf("?url=");
url = window.location.href.substring(index+5, window.location.href.length-14);
history.replaceState({}, "NativeDoc", "/nativeDoc");

$(".ndfHFb-c4YZDc-aSZUA-Wrql6b").remove();
dl_url = chrome.extension.getURL('dl.jpg');
print_url = chrome.extension.getURL('save.jpg')

// <div id='save' style='float:left' class='btn-l'><img class='icon' src='"+save_url+"'></div>
$("body").append("<div class='toolbar'><div id='print' style='float:left' class='btn-l'><img class='icon' src='"
    +print_url+"'></div><div id='download' style='float:right' class='btn-r'><img class='icon' src='"
    +dl_url+"'></div></div>")




$(document).ready(function() {
    

    $("body").wrap("<div class='invisible'></div>");
    $('.invisible').after("<div class='visible'></div>");


    //Extract total page numbers from the alt of the first page
    var firstBLOBAlt = $('.ndfHFb-c4YZDc-cYSp0e-DARUcf-RJLb9c').attr('alt');
    var numberIndex = firstBLOBAlt.indexOf("of ");
    var numPages = parseInt(firstBLOBAlt.substr(numberIndex + 3, firstBLOBAlt.length-numberIndex-3));

    var pages = [];
    var count = 0;
    for(var i = 0; i < numPages; i++) {
        //Asynchronous, so page order is arbitrary... need to sort it after all have loaded
        //At the same time, we can't block on the function because user needs to be able to move around
        $('<img class="blob" src="'+ nativeDoc_blob + (''+i) +'" page='+i+'>').load(function() {
            pages.push($(this));
            count++;
            if(count >= numPages) {
                console.log("DONE!");
                pages.sort(function(a,b) {
                    return a.attr("page") - b.attr("page");
                });

                pages.forEach(function(page) {
                    $('.visible').append(page);        
                });
            }
        });
    }
    
    $('#download').click(function(){
	   window.location.href = url;
    })

    $('#print').click(function(){
       window.print();
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
        // If Control or Command key is pressed and the R key is pressed
        // run refresh function. 82 is the key code for R.
        if((event.ctrlKey || event.metaKey) && event.which == 82) {
            // Refresh Function
            window.location.href = originalUrl;
            event.preventDefault();
        };
    });

    $(document).keydown(function(event) {
        // If Control or Command key is pressed and the P key is pressed
        // run print function. 80 is the key code for P.
        if((event.ctrlKey || event.metaKey) && event.which == 80) {
            window.print();            
           event.preventDefault();
        };
    });

});
