var server = require('./lib/server')
var workers = require('./lib/workers')
var cli = require('./lib/cli')

var app = {}

app.init = function (cb) {
  server.init()
  workers.init()

  setTimeout(function () {
    cli.init()
    cb()
  }, 50)
}

// Self invoking only if required directly
if (require.main === module) {
  app.init(function () {})
}

module.exports = app
