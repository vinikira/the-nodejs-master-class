var http = require('http')
var https = require('https')
var fs = require('fs')
var url = require('url')
var StringDecoder = require('string_decoder').StringDecoder
var path = require('path')
var util = require('util')
var config = require('./config')
var handlers = require('./handlers')
var helpers = require('./helpers')
var debug = util.debuglog('server')

var server = {}

server.httpServer = http.createServer(function (req, res) {
  server.unifiedServer(req, res)
})

server.httpsServerOptions = {
  'key': fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
  'cert': fs.readFileSync(path.join(__dirname, '/../https/cert.pem'))
}

server.httpsServer = https.createServer(server.httpsServerOptions, function (req, res) {
  server.unifiedServer(req, res)
})

server.unifiedServer = function (req, res) {
  var parsedUrl = url.parse(req.url, true)
  var path = parsedUrl.pathname
  var trimmedPath = path.replace(/^\/+|\/+$/g, '')
  var queryStringObject = parsedUrl.query
  var method = req.method.toLowerCase()
  var headers = req.headers

  var decorder = new StringDecoder('utf-8')
  var buffer = ''

  req.on('data', function (data) {
    buffer += decorder.write(data)
  })

  req.on('end', function () {
    buffer += decorder.end()

    var chooosedHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound

    var data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: helpers.parseJsonToObject(buffer)
    }

    chooosedHandler(data, function (statusCode, payload) {
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200

      payload = typeof(payload) === 'object' ? payload : {}

      var payloadString = JSON.stringify(payload)

      res.setHeader('Content-type', 'application/json')
      res.writeHead(statusCode)
      res.end(payloadString)

      debug('Returning this response:', statusCode, payloadString)

      if (statusCode === 200) {
        debug('\x1b[32m%s\x1b[0m', method.toUpperCase() + ' /' + trimmedPath + ' ' + statusCode)
      } else {
        debug('\x1b[31m%s\x1b[0m', method.toUpperCase() + ' /' + trimmedPath + ' ' + statusCode)
      }
    })
  })
}

server.router = {
  'ping': handlers.ping,
  'users': handlers.users,
  'tokens': handlers.tokens,
  'checks': handlers.checks
}

server.init = function () {
  server.httpServer.listen(config.httpPort, function () {
    console.log('\x1b[35m%s\x1b[0m', 'the HTTP server is running on port ' + config.httpPort)
  })

  server.httpsServer.listen(config.httpsPort, function () {
    console.log('\x1b[36m%s\x1b[0m', 'the HTTPS server is running on port ' + config.httpsPort)
  })
}

module.exports = server
