# Pym.js wrapper for datatools features

## only one script tag needed!

#### Before:

```html
<div id="urban_iframe"></div>
<script type="text/javascript"
        src="http://datatools.urban.org/features/fha-refinance/js/vendor/pym.js"></script>
<script>
  var pymParent = new pym.Parent(
    'urban_iframe',
    "http://datatools.urban.org/features/fha-refinance/index.html?rate=3.75&premium=0.85",
    {}
  );
</script>
```

#### After:

```html
<script src="http://datatools.urban.org/features/embed.js"
        data-viz="bsouthga/child-insurance"></script>
```

#### How it works:

when you add an embed script tag (as above) to your page, `embed.js` adds a rendering callback function (to render the iframe) to a global queue. This rendering callback checks for the existance of a global `pym` object (containing NPR's [pym.js](http://blog.apps.npr.org/pym.js/) library), downloading it if necessary. Once the document is loaded, the rendering callbacks are fired.

#### Warning!:

This script relies on 3 global variables...
```javascript
_URBAN_EMBED_COUNT
_URBAN_EMBED_QUEUE
_URBAN_EMBED_QUEUE_UNLOADING
```
