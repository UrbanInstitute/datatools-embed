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
var script = document.querySelector(
  'script[src="http://datatools.urban.org/features/embed.js"]'
);

// get requested data viz
var viz = script.getAttribute('data-viz');

// create urban frame node
var urban_frame = document.createElement('div');

// ad id to urban frame
urban_frame.id = "urban_frame_" + viz;

// insert div before script
script.parentNode.insertBefore(urban_frame, script);

// add pymParent to global object
this.pymParent = new pym.Parent(
  urban_frame.id,
  "http://datatools.urban.org/features/" + viz,
  {}
);

}).call(this);