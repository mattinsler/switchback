#!/usr/bin/env node

var util = require('util')
  , switchback = require('../lib/switchback');

switchback.command('echo', function() {
  util.puts(Array.prototype.slice.call(arguments, 0).join(' '));
}).exec();
