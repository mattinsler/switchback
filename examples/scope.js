#!/usr/bin/env node

var sys = require('sys')
  , switchback = require('../lib/switchback');

var foo = {bar: 'baz'};

switchback.command('foo', {
  scope: foo,
  description: 'Print out this.bar',
  method: function() {
    sys.puts(this.bar);
  }
}).exec();