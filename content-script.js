var myCanvas;
var canvasContainer;
var myAudio;
var flagCount = 0; // probably inelegant

_ini();

function onLoad() {
  // turn on night mode if the the user is at night!!!
  var hours = new Date().getHours();
  // we're going to turn this on at the witching hour, we can add client options to change this later
  var isNight = hours >= 0 && hours <= 3 ? true : false;

  if(isNight)
  {
    if(flagCount == 0)
      flagCount++;
    else if(flagCount == 1)
      flagCount = 2;
    nightMode(window);
  }
  else
    flagCount = 0;
  setTimeout(onLoad, 3000); // call me bb
}

function _ini(){
    window.onload = onLoad;
}

function nightMode(window) {
  // only trigger if I haven't been called before
  if(flagCount != 1)
    return;

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
  //	myCanvas.addEventListener("hover", onClick, false);

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

  spooky(); // sp00k

  // cursor stuff
  var cursorImage = document.createElement("img");
  cursorImage.src = chrome.extension.getURL("lightbulb.png");
  document.getElementsByTagName("body")[0].appendChild(cursorImage);
  cursorImage.id = "lightbulb";
  cursorImage.style.position = "absolute";
  cursorImage.style.zindex = 2147483647;

  $(document).mousemove(function(e)
  {
      // check if my x and y are the same as the skeletons
      context.globalAlpha = 1; // could change to 0.5 to dim the lights
      context.fillStyle = "#000";
      context.fillRect(0,0, myCanvas.width, myCanvas.height);

      $("#lightbulb").css({left:e.pageX - 150, top:e.pageY - 130});
      clearArc(context, e.pageX, e.pageY + 10, 100);

  });
}

// dances skeletons around, want to add sound later
function spooky() {
  // add spooky skeleton code
  $(document).ready(function(){
    randomlyMoveImage();
  });

  // function within a function!!! omg
  function randomlyMoveImage(){
    var width = $(document).width()-500;
    var height = $(document).height()-200;
    var x = Math.floor((Math.random() * width) + 1);
    var y = Math.floor((Math.random() * height) + 1);

    $("#spooky>img").animate({
        left: x,
        top: y
    }, 0, function() {/* animation complete */});
    setTimeout(randomlyMoveImage, 3000);
  }

  var div = document.createElement("div");
  div.id = "spooky";

  var image = document.createElement("img");
  image.src = chrome.extension.getURL('dancing-skeleton.gif');
  div.appendChild(image);
  document.body.appendChild(div);
}

// code to clear an arc
function clearArc(context, x, y, radius) {
  context.save();
  context.globalCompositeOperation = 'destination-out';
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fill();
  context.restore();
}
