var server = "me.com";
var address = "machadolucas@" + server;
function writemail(){
	document.write(address);
}


$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
	        || location.hostname == this.hostname) {

	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 500);
	        return false;
	      }
	    }
	  });
});


$(function() {
	var repeat = 1;
        var ch = 0;
	var item = 0;
	var items = $('#whatilike li').length;
	var time = 1000;
	var delay = 28;
	var wait = 3000;

	$('#ilike').css('width', ($('#whatilike').width() + 20));

	function tickInterval() {
		if(item < items) {
			var text = $('#whatilike li:eq('+item+')').text();
			type(text);
			text = null;
			var tick = setTimeout(tickInterval, time);
		} else {
			if(repeat == 1) {
                ch = 0;
                item = 0;
                tickInterval();
            } else {
                clearTimeout(tick);
            }
		}
	}

	function type(text) {
		time = delay;
		$('#ilike').html(text.substr(0, ch++));
		if(ch > text.length) {
			item++;
			ch = 0;
			time = wait;
		}
	}
	
	if($('#ilike').size() >= 1 ){
		var tick = setTimeout(tickInterval, time);
	}
});