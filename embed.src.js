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

// add loading function to queue
queue.push(load);

/*
  on document ready, recurse through callback queue
*/
function loadAllGraphics() {
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


// load a single viz
function load(callback) {
  // download pym if not in global namespace
  if (typeof pym === 'undefined') {
    callAjax("http://datatools.urban.org/features/pym.js", function(text) {
      eval(text);
      addIframe(pym);
      callback();
    });
  } else {
    addIframe(pym);
    callback();
  }
}

// add iframe for this visual
function addIframe(pym) {

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


/*
  Canabalized crossbrowser jquery ready function
  http://stackoverflow.com/a/7053197/1718488
*/
var jQueryDocumentOnReady = (function() {

  var readyList,
    DOMContentLoaded,
    class2type = {};
    class2type["[object Boolean]"] = "boolean";
    class2type["[object Number]"] = "number";
    class2type["[object String]"] = "string";
    class2type["[object Function]"] = "function";
    class2type["[object Array]"] = "array";
    class2type["[object Date]"] = "date";
    class2type["[object RegExp]"] = "regexp";
    class2type["[object Object]"] = "object";

  var ReadyObj = {
    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,
    // A counter to track how many items to wait for before
    // the ready event fires. See #6781
    readyWait: 1,
    // Hold (or release) the ready event
    holdReady: function( hold ) {
      if ( hold ) {
        ReadyObj.readyWait++;
      } else {
        ReadyObj.ready( true );
      }
    },
    // Handle when the DOM is ready
    ready: function( wait ) {
      // Either a released hold or an DOMready/load event and not yet ready
      if ( (wait === true && !--ReadyObj.readyWait) || (wait !== true && !ReadyObj.isReady) ) {
        // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
        if ( !document.body ) {
          return setTimeout( ReadyObj.ready, 1 );
        }

        // Remember that the DOM is ready
        ReadyObj.isReady = true;
        // If a normal DOM Ready event fired, decrement, and wait if need be
        if ( wait !== true && --ReadyObj.readyWait > 0 ) {
          return;
        }
        // If there are functions bound, to execute
        readyList.resolveWith( document, [ ReadyObj ] );

        // Trigger any bound ready events
        //if ( ReadyObj.fn.trigger ) {
        //  ReadyObj( document ).trigger( "ready" ).unbind( "ready" );
        //}
      }
    },
    bindReady: function() {
      if ( readyList ) {
        return;
      }
      readyList = ReadyObj._Deferred();

      // Catch cases where $(document).ready() is called after the
      // browser event has already occurred.
      if ( document.readyState === "complete" ) {
        // Handle it asynchronously to allow scripts the opportunity to delay ready
        return setTimeout( ReadyObj.ready, 1 );
      }

      // Mozilla, Opera and webkit nightlies currently support this event
      if ( document.addEventListener ) {
        // Use the handy event callback
        document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
        // A fallback to window.onload, that will always work
        window.addEventListener( "load", ReadyObj.ready, false );

      // If IE event model is used
      } else if ( document.attachEvent ) {
        // ensure firing before onload,
        // maybe late but safe also for iframes
        document.attachEvent( "onreadystatechange", DOMContentLoaded );

        // A fallback to window.onload, that will always work
        window.attachEvent( "onload", ReadyObj.ready );

        // If IE and not a frame
        // continually check to see if the document is ready
        var toplevel = false;

        try {
          toplevel = window.frameElement == null;
        } catch(e) {}

        if ( document.documentElement.doScroll && toplevel ) {
          doScrollCheck();
        }
      }
    },
    _Deferred: function() {
      var // callbacks list
        callbacks = [],
        // stored [ context , args ]
        fired,
        // to avoid firing when already doing so
        firing,
        // flag to know if the deferred has been cancelled
        cancelled,
        // the deferred itself
        deferred  = {

          // done( f1, f2, ...)
          done: function() {
            if ( !cancelled ) {
              var args = arguments,
                i,
                length,
                elem,
                type,
                _fired;
              if ( fired ) {
                _fired = fired;
                fired = 0;
              }
              for ( i = 0, length = args.length; i < length; i++ ) {
                elem = args[ i ];
                type = ReadyObj.type( elem );
                if ( type === "array" ) {
                  deferred.done.apply( deferred, elem );
                } else if ( type === "function" ) {
                  callbacks.push( elem );
                }
              }
              if ( _fired ) {
                deferred.resolveWith( _fired[ 0 ], _fired[ 1 ] );
              }
            }
            return this;
          },

          // resolve with given context and args
          resolveWith: function( context, args ) {
            if ( !cancelled && !fired && !firing ) {
              // make sure args are available (#8421)
              args = args || [];
              firing = 1;
              try {
                while( callbacks[ 0 ] ) {
                  callbacks.shift().apply( context, args );//shifts a callback, and applies it to document
                }
              }
              finally {
                fired = [ context, args ];
                firing = 0;
              }
            }
            return this;
          },

          // resolve with this as context and given arguments
          resolve: function() {
            deferred.resolveWith( this, arguments );
            return this;
          },

          // Has this deferred been resolved?
          isResolved: function() {
            return !!( firing || fired );
          },

          // Cancel
          cancel: function() {
            cancelled = 1;
            callbacks = [];
            return this;
          }
        };

      return deferred;
    },
    type: function( obj ) {
      return obj == null ?
        String( obj ) :
        class2type[ Object.prototype.toString.call(obj) ] || "object";
    }
  }
  // The DOM ready check for Internet Explorer
  function doScrollCheck() {
    if ( ReadyObj.isReady ) {
      return;
    }

    try {
      // If IE is used, use the trick by Diego Perini
      // http://javascript.nwbox.com/IEContentLoaded/
      document.documentElement.doScroll("left");
    } catch(e) {
      setTimeout( doScrollCheck, 1 );
      return;
    }

    // and execute any waiting functions
    ReadyObj.ready();
  }
  // Cleanup functions for the document ready method
  if ( document.addEventListener ) {
    DOMContentLoaded = function() {
      document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
      ReadyObj.ready();
    };

  } else if ( document.attachEvent ) {
    DOMContentLoaded = function() {
      // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
      if ( document.readyState === "complete" ) {
        document.detachEvent( "onreadystatechange", DOMContentLoaded );
        ReadyObj.ready();
      }
    };
  }
  function ready( fn ) {
    // Attach the listeners
    ReadyObj.bindReady();

    var type = ReadyObj.type( fn );

    // Add the callback
    readyList.done( fn );//readyList is result of _Deferred()
  }
  return ready;
})();


// execute document ready function
jQueryDocumentOnReady(loadAllGraphics);


}).call(this, document, undefined);
