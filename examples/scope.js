#!/usr/bin/env node

var util = require('util')
  , switchback = require('../lib/switchback');

var foo = {bar: 'baz'};

switchback.command('foo', {
  scope: foo,
  description: 'Print out this.bar',
  method: function() {
    util.puts(this.bar);
  }
}).exec();
