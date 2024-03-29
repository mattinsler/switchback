# Installation

```shell
npm install switchback
```

# Usage

### Commands

Simple

```javascript
var util = require('util')
  , switchback = require('switchback');

switchback.command('echo', function() {
  util.puts(Array.prototype.slice.call(arguments, 0).join(' '));
}).exec();
```

With description

```javascript
switchback.command('echo', {
  description: 'This will echo back what you write',
  method: function() {
    util.puts(Array.prototype.slice.call(arguments, 0).join(' '));
  }
}).exec();
```

With scope

```javascript
var foo = {bar: 'baz'};

switchback.command('foo', {
  scope: foo,
  description: 'Print out this.bar',
  method: function() {
    util.puts(this.bar);
  }
}).exec();
```

### Namespaces

```javascript
switchback.namespace('auth', function(switchback) {
  switchback.describe('Authentication methods')
  .command('login', {
    scope: auth_service,
    description: 'Login to service',
    method: auth_service.login
  })
  .command('logout', {
    scope: auth_service,
    description: 'Logout of service',
    method: auth_service.logout
  })
}).exec();
```