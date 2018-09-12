var server = require('./lib/server')
var workers = require('./lib/workers')
var cli = require('./lib/cli')

var app = {}

app.init = function () {
  server.init()
  workers.init()

  setTimeout(function () {
    cli.init()
  }, 50)

  debugger

  var foo = 1
  console.log('declare foo')
  debugger

  foo++
  console.log('increment foo')
  debugger

  foo = foo * foo
  console.log('multiply foo by itself')
  debugger

  foo = foo.toString()
  console.log('change foo to string')
  debugger
}

app.init()

module.exports = app
