/*
  Pym.js auto-insertion script
  @bsouthga
  03/05/15

  Allows for simpler embed code, for example

  <script src="http://datatools.urban.org/features/embed.js"
          data-viz="bsouthga/child-insurance"></script>
*/

;(function(document, undefined) {

// store window reference
var win = this;

// iframe load queue
var queue = win._URBAN_EMBED_QUEUE = (
  win._URBAN_EMBED_QUEUE === undefined ? [] :
  win._URBAN_EMBED_QUEUE
);

// we need pym to be loaded and the document to be ready...
var events_remaining = 2;

if (win.pym && !win._URBAN_PYM_INJECTED) {
  win._URBAN_PYM_INJECTED = true;
  events_remaining = 1;
} else if (!win.pym && !win._URBAN_PYM_INJECTED) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
//URL WILL BE REPLACED BY:
//    http://apps.urban.org/assets/js/urban/datatools-embed/pym.js
// once it's built and installed...
  script.src = 'http://datatools.urban.org/features/pym.js';
  script.async = false;
  script.onload = loadAllGraphics;
  document.body.appendChild(script);
  win._URBAN_PYM_INJECTED = true;
}

document.addEventListener("DOMContentLoaded", loadAllGraphics);

// add loading function to queue
queue.push(addImage);

/*
  on document ready, recurse through callback queue
*/
function loadAllGraphics(event) {
  if (--events_remaining) return null;
  // check if we've already started loading the graphics
  var unloading = win._URBAN_EMBED_QUEUE_UNLOADING;
  // if unloading not yet started, begin
  if (!unloading) unload();
  // recursively call functions in callback queue
  function unload() {
    var init = queue.pop();
    if (init !== undefined) init(unload);
  }
  // note that unloading has began
  win._URBAN_EMBED_QUEUE_UNLOADING = true;
}

// add iframe for this visual
function addImage(callback) {
  //get IE version (or -1 for non IE browsers)
  var ieVersion = getInternetExplorerVersion();

  // Select this script
  var scripts = document.querySelectorAll(
//URL WILL BE REPLACED BY:
//    http://apps.urban.org/assets/js/urban/datatools-embed/embed.js
// once it's built and installed...
    'script[src="http://apps-staging.urban.org/assets/js/urban/tmp/embed.js"]'
  );

  // increment global count of urban embeded
  var count = win._URBAN_EMBED_COUNT = (
    win._URBAN_EMBED_COUNT === undefined ? 0 :
    win._URBAN_EMBED_COUNT + 1
  );

  // get this script tag
  var script = scripts[count];

  // get requested data viz
  var viz = script.getAttribute('data-viz');

  // create urban frame node
  var urban_frame = document.createElement('div');
  //use iframe for IE less than or equal to 8, or for non IE browsers
  if( ieVersion >= 9 || ieVersion == -1){
    // ad id to urban frame
    urban_frame.id = "urban-frame-" + viz.replace(/[\W_]+/g,"-").toLowerCase();

    // insert div before script
    script.parentNode.insertBefore(urban_frame, script);

    // add pymParent to global object
    this['pymParent_' + urban_frame.id] = new pym.Parent(
      urban_frame.id,
      viz,
      {}
    );
  }

  else{
    urban_frame.id = "urban-frame-fallback-" + viz.replace(/[\W_]+/g,"-").toLowerCase();
    var fallback = document.createElement('img')
    fallback.className = "ie-fallback-image"

    //remove *.html from end of path, if it is there, then look for fallback image in same directory as
    //html (usually index.html), with name fallback.png
    var lastPath = viz.split("/").pop()
    var imgPath;
    if(lastPath.search("html") != -1){ imgPath = viz.replace(lastPath, "") + "fallback.png" }
    else{ imgPath = viz + "/fallback.png" }

    //add the image to the urban_frame div
    fallback.src = imgPath
    urban_frame.appendChild(fallback)
    script.parentNode.insertBefore(urban_frame, script);
  }

  // call callback
  callback();
}

function getInternetExplorerVersion(){
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}

}).call(this, document, undefined);
