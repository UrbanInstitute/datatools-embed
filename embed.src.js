/*
  Pym.js auto-insertion script
  @bsouthga
  03/05/15

  Allows for simpler embed code, for example

  <script src="http://datatools.urban.org/features/embed.js"
          data-viz="bsouthga/child-insurance"></script>

*/

;(function() {

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

}).call(this);