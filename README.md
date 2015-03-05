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