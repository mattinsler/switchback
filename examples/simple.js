#!/usr/bin/env node

var sys = require('sys')
  , switchback = require('../lib/switchback');

switchback.command('echo', function() {
  sys.puts(Array.prototype.slice.call(arguments, 0).join(' '));
}).exec();