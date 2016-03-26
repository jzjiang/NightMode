_ini();

function _ini(){
	window.onload = function(){	
		
		
		$(document).ready(function(){
			randomlyMoveImage();
		});
	

		function randomlyMoveImage(){
			var width = $(document).width()-500;
			var height = $(document).height()-200;
			var x = Math.floor((Math.random() * width) + 1);
			var y = Math.floor((Math.random() * height) + 1);
			
			
			$("#spooky>img").animate({
				
				left: x,
				top: y
			}, 0, function() {
				console.log(x, y);
			// Animation complete.
					});

		setTimeout(randomlyMoveImage, 3000);
		}

		
		var div = document.createElement("div");
		div.id = "spooky";
			
		var image = document.createElement("img");
		image.src = chrome.extension.getURL('dancing-skeleton.gif');	
		div.appendChild(image);
		document.body.appendChild(div);	
	}
}