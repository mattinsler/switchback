# Installation

`npm install switchback`

# Usage

```javascript

var sys = require('sys')
  , switchback = require('switchback');

switchback.command('echo', function() {
  sys.puts(Array.prototype.slice.call(arguments, 0).join(' '));
}).exec();

```