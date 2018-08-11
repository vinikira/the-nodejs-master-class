/**
 * Helpers for various tasks
 */

var crypto = require('crypto')
var config = require('./config')

// container for helpers
var helpers = {}

// create a SHA256 hash
helpers.hash = function (str) {
  if (typeof(str) === 'string' && str.length > 0) {
    var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex')

    return hash
  } else {
    return false
  }
}

// parse a json string to an object
helpers.parseJsonToObject = function (str) {
  try {
    var obj = JSON.parse(str)

    return obj
  } catch (err) {
    return {}
  }
}

module.exports = helpers
