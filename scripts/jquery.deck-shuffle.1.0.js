/*
Demo: jQuery Deck Shuffle
Author: Ian Lunn
Author URL: http://www.ianlunn.co.uk/
Demo URL: http://www.ianlunn.co.uk/demos/jquery-deck-shuffle/
Tutorial URL: http://www.ianlunn.co.uk/blog/code-tutorials/jquery-deck-shuffle/

License: http://creativecommons.org/licenses/by-sa/3.0/ (Attribution Share Alike). Please attribute work to Ian Lunn simply by leaving these comments in the source code or if you'd prefer and be so kind, place a link on your website to http://www.ianlunn.co.uk/.

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/


//global variables to be setup for later use
var previous;
var active;

//moves the top layer to the middle and ammends the size of all child elements
function moveMiddle(el){
	$(el).animate({'left': '100px', 'height': '288px', 'width': '224px', 'top': '52px'}, {duration: 200,queue: false}); //moves the layer to the middle
	$(el).children('h2, p, ul').animate({'font-size': '80%'}, {duration: 200,queue: false}); //makes all text elements smaller
	$(el).children('.order').animate({'width': '80%'}, {duration: 200,queue: false}); //makes the order button smaller
	$(el).css({'z-index': '2'}); //moves the layer back one (to sit behind the top layer)
}

//moves the middle layer to the bottom and ammends the size of all child elements
function moveBottom(el){
	$(el).animate({'left': '185px', 'height': '216px', 'width': '168px', 'top': '95px'}, {duration: 200,queue: false}); //moves the layer to the bottom
	$(el).children('h2, p, ul').animate({'font-size': '60%'}, {duration: 200,queue: false}); //makes all text elements smaller
	$(el).children('.order').animate({'width': '60%'}, {duration: 200,queue: false}); //makes the order button smaller
	$(el).css({'z-index': '1'}); //moves the layer back one (to sit at the bottom, behind all layers)
}

//moves the selected layer to the top of the deck
function moveTop(el){
	
	//the animation is active (we store this to make sure the animation doesn't try to run again whilst it's in progress)
	active = true; 
	
	//move element out of the deck
	$(el).animate({'left': '310px', 'height': '360px', 'width': '280px', 'top': '0px'}, 200, function(){
				
		$(el).css("z-index", 3); //move element to the top of the deck
		if(zindex == 2){ //if the user has selected the middle layer
			moveMiddle('.top'); //move the top layer to the middle
			$('.top').attr("class", "middle"); //top becomes middle
			$(el).attr("class", "top"); //hovered element becomes top			
		}else if(zindex == 1){ //if the user has selected the bottom layer
			moveMiddle('.top'); //move the top layer to the middle
			moveBottom('.middle'); //move the middle layer to the bottom
			$('.middle').attr("class", "bottom"); //middle becomes bottom
			$('.top').attr("class", "middle"); //top becomes middle
			$(el).attr("class", "top"); //hovered element becomes top
		}
		
		$(el).animate({'left': '0px'}, 200, function(){ //move element back into the deck
			active = false; //the animation has finished
		}); 

	});
	$(el).children('p, ul, h2').animate({'font-size': '100%'}); //make the text elements full size
	$(el).children('.order').animate({'width': '100%'}); //make the order button full size
}

function swap(){ //the function called when we want to swap the cards
	zindex = $(this).css('z-index'); //get the z-index of the layer the cursor is over
	if(previous != zindex && zindex != 3 && active != true){ //if this isn't the previously moved layer, isn't the top layer and the animation is not currently running... 
		moveTop(this); //move the layer to the top
	}
	previous = zindex; //store the last layer that was moved
}
	
function out(){
	//required for .hoverIntent() to work
}

$(document).ready(function(){ //when the page has loaded and is ready to go...
		
	$('#container').mouseleave(function(){ //when the cursor leaves the deck...
		previous = null;
	});
	
	$('#one, #two, #three').hoverIntent(swap, out); //if the user hovers over any card, activate the hoverIntent function...

});