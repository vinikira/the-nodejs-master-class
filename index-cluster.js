var server = require('./lib/server')
var workers = require('./lib/workers')
var cli = require('./lib/cli')
var cluster = require('cluster')
var os = require('os')

var app = {}

app.init = function (cb) {
  if (cluster.isMaster) {
    workers.init()

    setTimeout(function () {
      cli.init()
      cb()
    }, 50)

    for (var i = 0; i < os.cpus().length; i++) {
      cluster.fork()
    }
  } else {
    server.init()
  }
}

// Self invoking only if required directly
if (require.main === module) {
  app.init(function () {})
}

module.exports = app
