#!/usr/bin/env node

var switchback = require('../lib/switchback');

function foo(name) {
  return function(args) {
    console.log(name);
  }
}

switchback.namespace('auth', function(switchback) {
  switchback
  .describe('# authentication (login, logout)')
  .execute(foo('auth'))

  .command('login', {
    description: '# log in with your heroku credentials',
    method: foo('auth login')
  })
  .command('logout', {
    description: '# clear local authentication credentials',
    method: foo('auth logout')
  });
})
switchback.namespace('apps', function(switchback) {
  switchback
  .describe('# manage apps (create, destroy)')
  .execute(foo('apps'))

  // apps:create [NAME]   # create a new app
  // apps:destroy         # permanently destroy an app
  // apps:info            # show detailed app information
  // apps:open            # open the app in a web browser
  // apps:rename NEWNAME  # rename the app

  .command('create', {
    description: '# create a new app',
    method: foo('apps create')
  })
  .command('destroy', {
    description: '# permanently destroy an app',
    method: function() {}
  })
  .command('info', {
    description: '# show detailed app information',
    method: function() {}
  })
  .command('open', {
    description: '# open the app in a web browser',
    method: function() {}
  })
  .command('rename', {
    description: '# rename the app',
    method: function() {}
  });
})
.exec();