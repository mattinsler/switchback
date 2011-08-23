#!/usr/bin/env node

var switchback = require('../lib/switchback');

switchback.command('echo', function(context) {
  console.log(context.arguments.join(' '));
});

switchback.exec();