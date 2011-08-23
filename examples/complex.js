#!/usr/bin/env node

var switchback = require('../lib/switchback');

switchback.command('echo', {
  description: 'Echos your arguments',
  switches: {
    c: 'color'
  },
  method: function(context) {
    console.log(context.arguments.join(' '));
  }
});

switchback.exec();
