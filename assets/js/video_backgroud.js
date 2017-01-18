$(function() {
	if(screen.width > 800){
	$( window ).scroll(function() {
		var scrolltop = $( window ).scrollTop();
		if(scrolltop >= 80 && scrolltop< 130){
			$("#li_bb").css("background","rgba(0,0,0,0.2)");
		}else if(scrolltop >= 130 && scrolltop< 180 ){
			$("#li_bb").css("background","rgba(0,0,0,0.4)");
		}else if(scrolltop >= 180 & scrolltop< 230){
			$("#li_bb").css("background","rgba(0,0,0,0.6)");
		}else if(scrolltop >= 230 && scrolltop< 280){
			$("#li_bb").css("background","rgba(0,0,0,0.7)");
		}else if(scrolltop >= 280){		
			$("#li_bb").css("background","rgba(0,0,0,1)");	
		}else{
			$("#li_bb").css("background","none");
		}
	});
	}else{
		$("#li_bb").css("background","rgba(0,0,0,1)");
	}
});	


function test(){
	var video = document.getElementById("video_paly");
	if (video.paused) {
		video.play();
		$("#video_play").html("||");
	}else{
		video.pause();
		$("#video_play").html(">");
	}
}


$(function() {
	
	// IE detect
	function iedetect(v) {
	    var r = RegExp('msie' + (!isNaN(v) ? ('\\s' + v) : ''), 'i');
		return r.test(navigator.userAgent);		
	}

	// For mobile screens, just show an image called 'poster.jpg'. Mobile
	// screens don't support autoplaying videos, or for IE.
	if(screen.width < 800 || iedetect(8) || iedetect(7) || 'ontouchstart' in window) {
		
		(adjSize = function() { // Create function called adjSize
			
			$width = $(window).width(); // Width of the screen
			$height = $(window).height(); // Height of the screen
			
			// Resize image accordingly
			$('#video_back').css({
				'background' : 'url(assets/img/bg/divider3.jpg) 50% 0 no-repeat fixed', 
				'background-size' : 'cover', 
				'width' : $width+'px', 
				'height' : $height+'px'
			});
			
			// Hide video
			$('video').hide();
			
		})(); // Run instantly
		
		// Run on resize too
		$(window).resize(adjSize);
	}
	else {
		// Wait until the video meta data has loaded

			$('#video_back video').on('loadedmetadata', function() {
				
				var $width, $height, // Width and height of screen
				$vidwidth = this.videoWidth, // Width of video (actual width)
				$vidheight = this.videoHeight, // Height of video (actual height)
				$aspectRatio = $vidwidth / $vidheight; // The ratio the video's height and width are in
							
				(adjSize = function() { //Create function called adjSize
								
					$width = $(window).width(); // Width of the screen
					$height = $(window).height(); // Height of the screen
					$boxRatio = $width / $height; // The ratio the screen is in
					$adjRatio = $aspectRatio / $boxRatio; /* The ratio of the video divided by the screen size*/
								
					// Set the video_back to be the width and height of the screen
					$('#video_back').css({'width' : $width+'px', 'height' : $height+'px'}); 
								
					if($boxRatio < $aspectRatio) { // If the screen ratio is less than the aspect ratio..
						// Set the width of the video to the screen size multiplied by $adjRatio
						$vid = $('#video_back video').css({'width' : $width*$adjRatio+'0px'}); 
					} else {
						// Else just set the video to the width of the screen/video_back
						$vid = $('#video_back video').css({'width' : $width+'px'});
					}
									 
				})(); // Run function immediately
							
				// Run function also on window resize.
				$(window).resize(adjSize);	
			});
	}//end if
});