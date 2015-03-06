/*
  Pym.js auto-insertion script
  @bsouthga
  03/05/15

  Allows for simpler embed code, for example

  <script src="http://datatools.urban.org/features/embed.js"
          data-viz="bsouthga/child-insurance"></script>

*/

;(function() {

// store window reference
var win = this;

// download pym if not in global namespace
if (!this.pym) {
  callAjax("http://datatools.urban.org/features/pym.js", function(text) {
    eval(text);
    addIframe.call(win, pym);
  });
} else {
  addIframe.call(win, pym);
}

// add iframe for this visual
function addIframe(pym) {

  // Select this script
  var scripts = document.querySelectorAll(
    'script[src="http://datatools.urban.org/features/embed.js"]'
  );

  // increment global count of urban embeded
  var count = this._URBAN_EMBED_COUNT = (
    this._URBAN_EMBED_COUNT === undefined ? 0 :
    this._URBAN_EMBED_COUNT + 1
  );

  // get this script tag
  var script = scripts[count];

  // get requested data viz
  var viz = script.getAttribute('data-viz');

  // create urban frame node
  var urban_frame = document.createElement('div');

  // ad id to urban frame
  urban_frame.id = "urban_frame_" + viz;

  // insert div before script
  script.parentNode.insertBefore(urban_frame, script);

  // add pymParent to global object
  this['pymParent_' + urban_frame.id] = new pym.Parent(
    urban_frame.id,
    "http://datatools.urban.org/features/" + viz,
    {}
  );

}

// download file
function callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

}).call(this);