#!/usr/bin/env node

var switchback = require('../lib/switchback');

switchback.command('echo', {
  description: 'Echos your arguments',
  switches: {
    c: 'color',
    b: {
      name: 'boolean',
      boolean: true
    }
  },
  method: function(context) {
    console.log(context.arguments.join(' '));
  }
})
.command('foo', {
  description: 'bar',
  method: function() {
    
  }
})
.exec();