var sys = require('sys')
  , path = require('path');

var switchback = exports;

function pad(value, length) {
  for (var x = value.length; x < length; ++x) {
    value += ' ';
  }
  return value;
}

function print_help_topic(context, topic) {
  console.log(arguments);
}

function print_help(context) {
  if ('help' === context.command && 1 === context.arguments.length && structure[context.arguments[0]]) {
    return print_help_topic(context, context.arguments[0]);
  }
  
  sys.puts('Usage: ' + context.program + ' COMMAND [options]');
  sys.puts('');
  sys.puts('To get help about a specific topic, type "' + context.program + ' help TOPIC"');
  sys.puts('Topics:');
  sys.puts('');
  
  Object.keys(structure).sort().forEach(function(name) {
    sys.puts('  ' + pad(name, 16) + structure[name].description);
  });
}

var structure = {};

switchback.command = function(name, options) {
  var cmd = {
    method: function(context) {},
    description: ''
  };
  
  if (typeof(options) === 'function') {
    cmd.method = options;
  } else {
    for (var k in options) {
      cmd[k] = options[k];
    }
  }
  structure[name] = cmd;
};

switchback.exec = function() {
  var args = process.argv.slice(1);
  var context = {
    program: args.shift(),
    command: args.shift(),
    arguments: args
  }
  
  console.log(context);
  
  if (!context.command || !structure[context.command]) { return print_help(context); }
  return structure[context.command].method(context);
};