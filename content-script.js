var myCanvas;
var canvasContainer;
var skeletons  = [];

_ini();

function _ini(){

    window.onload = function(){

		// create a canvas
		if (!myCanvas)
		{
			if (!canvasContainer)
			{
				canvasContainer = document.createElement('div');
				canvasContainer.id = "canvasContainer";
				document.body.appendChild(canvasContainer);
				canvasContainer.style.position="absolute";
				canvasContainer.style.left="0px";
				canvasContainer.style.top="0px";
				canvasContainer.style.width="100%";
				canvasContainer.style.height="100%";
				canvasContainer.style.zIndex="1000";
				superContainer=document.body;
			}
			else
				superContainer=canvasContainer;

			// Part of block below is inspired by code from Google excanvas.js
			{
			myCanvas = document.createElement('canvas');
			myCanvas.id = "myCanvas";
			myCanvas.addEventListener("hover", onClick, false);

			myCanvas.style.width = superContainer.scrollWidth+"px";
			myCanvas.style.height = superContainer.scrollHeight+"px";
			// You must set this otherwise the canvas will be streethed to fit the container
			myCanvas.width=superContainer.scrollWidth;
			myCanvas.height=superContainer.scrollHeight;
			//surfaceElement.style.width=window.innerWidth;
			myCanvas.style.overflow = 'visible';
			myCanvas.style.position = 'absolute';
			}

			var context=myCanvas.getContext('2d');
			context.globalAlpha = 1;
			context.fillStyle = "#000";

			context.fillRect(0,0, myCanvas.width, myCanvas.height);
			canvasContainer.appendChild(myCanvas);

			$("#myCanvas").css("pointer-events", "none");
			//alert(myCanvas);
		}
		else
			myCanvas.parentNode.style.visibility='visible';

		// add spooky skeleton code
		$(document).ready(function(){
			//randomlyMoveImage();
		});

		var div = document.createElement("div");
		div.id = "spooky";
		for (var i = 0; i < 5; i++){
			var skeleton = document.createElement("img");
			skeleton.src = chrome.extension.getURL('dancing-skeleton.gif');
			skeleton.id = "skeleton" + i;
			skeletons.push(skeleton);
			div.appendChild(skeleton);
			console.log(skeleton);
		}
			document.body.appendChild(div);
			console.log("help");
			
		
		
		function randomlyMoveImage(){
			var width = $(document).width()-500;
			var height = $(document).height()-200;
			
			console.log("hot thunder");
			console.log($("#spooky"));
			
			for (var i = 0; i < 5; i++){
				console.log("THIS IS REALLY I: " + i);
				var x = Math.floor((Math.random() * width) + 1);
				var y = Math.floor((Math.random() * height) + 1);
				
				console.log("dis mah image pls")
				console.log($("#spooky").children()[i]);

				$("#skeleton" + i).animate({
					left: x,
					top: y
				}, 0, function() { 
				console.log("i: "+ i +" x: " + x + " y: "+ y);
				console.log("animating dawg");
				// Animation complete.
						});
			}
		setTimeout(randomlyMoveImage, 3000);
		}
		

		// draw a circle where the mouse is
		// cursor shit

		var cursorImage = document.createElement("img");
		cursorImage.src = chrome.extension.getURL("lightbulb.png");
		document.getElementsByTagName("body")[0].appendChild(cursorImage);
		cursorImage.id = "lightbulb";
		cursorImage.style.position = "absolute";
		cursorImage.style.zindex = 2147483648;

		$(document).mousemove(function(e)
		{
				context.globalAlpha = 1;
				context.fillStyle = "#000";
				context.fillRect(0,0, myCanvas.width, myCanvas.height);

				$("#lightbulb").css({left:e.pageX - 150, top:e.pageY - 130});
				clearArc(context, e.pageX, e.pageY + 10, 100);

		});
		
		randomlyMoveImage();

    }
}

// someone else's cool code
function clearArc(context, x, y, radius) {
  context.save();
  context.globalCompositeOperation = 'destination-out';
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fill();
  context.restore();
}

// click handler that reroutes clicks to other things
 function onClick(e) {
// 		// get all elemnts
// 	 	var all = document.getElementsByTagName("*");
// 		var mouseX = e.clientX;
// 		var mouseY = e.clientY;
//
// 		// look throuh all my alements
// 		for(var i = 0; i < all.length; i++) {
// 			var obj = all[i];
// 			var width = obj.clientWidth;
// 			var height = obj.clientHeight;
//
// 			if (mouseX > obj.offsetLeft && mouseX < obj.offsetLeft + width
// 				&& mouseY > obj.offsetTop && mouseY < obj.offsetTop + height)
// 				{
// 						all[i].onclick(); // Force click event if within dimensions
// 				}
// 		}
 }
