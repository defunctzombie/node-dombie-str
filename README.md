# dombie-str

render a [dombie](https://github.com/shtylman/node-dombie) dom tree back into original form

```javascript
var dombie = require('dombie');
var dombie_str = require('dombie-str');

dombie(src, function(err, dom) {

    // minime returns a read stream interface
    dombie_str(dom, function(err, out) {
        // out is the re-rendered html
    });
});
```
