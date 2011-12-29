var util = require('util')
  , path = require('path');

function pad(value, length) {
  for (var x = value.length; x < length; ++x) {
    value += ' ';
  }
  return value;
}

function program_path(program) {
  var cwd = process.cwd();
  if (program.indexOf(cwd) === 0) {
    return program.substring(cwd.length + 1);
  } else {
    var p = path.dirname(program).split('/');
    var c = cwd.split('/');
    for (var x = 0; x < Math.min(p.length, c.length); ++x) {
      if (p[x] !== c[x]) {
        var parts = [];
        for (var y = 0; y < (c.length - x); ++y) {
          parts.push('..');
        }
        return parts.concat(p.slice(x)).join('/') + '/' + path.basename(program);
      }
    }
  }
}





function Switchback(context) {
  this.context = context;
  this.structure = {};
}

Switchback.prototype.program = function(program) {
  this.context.program = program;
  return this;
};

Switchback.prototype.describe = function(description) {
  this.structure._description = description;
  return this;
};

Switchback.prototype.execute = function(method) {
  this.structure._method = method;
  return this;
};

Switchback.prototype.namespace = function(name, config_callback) {
  var child = new Switchback();
  config_callback(child);
  this.structure[name] = child.structure;
  return this;
};

Switchback.prototype.command = function(name, options) {
  var cmd = {
    _method: function() {},
    _description: '',
    _scope: null
  };
  
  if (typeof(options) === 'function') {
    cmd._method = options;
  } else {
    for (var k in options) {
      if (k === 'description') {
        cmd['_description'] = options[k];
      } else if (k === 'method') {
        cmd['_method'] = options[k];
      } else if (k === 'scope') {
        cmd['_scope'] = options[k];
      }
    }
  }
  this.structure[name] = cmd;
  return this;
};

Switchback.prototype.print_help_structure = function(structure, prefix) {
  util.puts('');

  Object.keys(structure).filter(function(item) {
    return item[0] !== '_';
  }).forEach(function(topic) {
    util.puts('  ' + (prefix ? prefix + ' ' : '') + pad(topic, 16) + structure[topic]._description);
  });
  
  util.puts('');
};

Switchback.prototype.help_topic = function(topic) {
  util.puts('Additional commands, type "' + this.context.program + ' help COMMAND" for more details:');
  this.print_help_structure(this.structure[topic], topic);
};

Switchback.prototype.help = function() {
  if ('help' === this.context.command && 1 === this.context.arguments.length && this.structure[this.context.arguments[0]]) {
    return this.help_topic(this.context.arguments[0]);
  }
  
  util.puts('Usage: ' + this.context.program + ' COMMAND [options]');
  util.puts('');
  util.puts('Primary help topics, type "' + this.context.program + ' help TOPIC" for more details:');
  this.print_help_structure(this.structure);
};

Switchback.prototype.exec = function() {
  var self = this;
  function exec_method(structure, command, args) {
    var a = structure[command];
    if (!a) { return self.help(); }
    if (args.length > 0 && a[args[0]]) {
      return exec_method(a, args[0], args.slice(1));
    }
    return a._method.apply(a._scope, args);
  }
  
  exec_method(this.structure, this.context.command, this.context.arguments);
};

var args = process.argv.slice(1);
var context = {
  program: program_path(args.shift()),
  command: args.shift(),
  arguments: args
};

module.exports = new Switchback(context);
