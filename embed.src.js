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

if (!win._URBAN_PYM_INJECTED) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://datatools.urban.org/features/pym.js';
  script.async = false;
  script.onload = loadAllGraphics;
  document.body.appendChild(script);
  win._URBAN_PYM_INJECTED = true;
}

document.addEventListener("DOMContentLoaded", loadAllGraphics);

// add loading function to queue
queue.push(addIframe);

/*
  on document ready, recurse through callback queue
*/
var events_remaining = 2;
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
function addIframe(callback) {

  // Select this script
  var scripts = document.querySelectorAll(
    'script[src="http://datatools.urban.org/features/embed.js"]'
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

  // ad id to urban frame
  urban_frame.id = "urban-frame-" + viz.replace(/[\W_]+/g,"-").toLowerCase();

  // insert div before script
  script.parentNode.insertBefore(urban_frame, script);

  // add pymParent to global object
  this['pymParent_' + urban_frame.id] = new pym.Parent(
    urban_frame.id,
    "http://datatools.urban.org/features/" + viz,
    {}
  );

  // call callback
  callback();
}


}).call(this, document, undefined);
