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

// create a random string with the gived length
helpers.createRandomString = function (strLength) {
  strLength = typeof(strLength) === 'number' && strLength > 0 ? strLength : false

  if (strLength) {
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    var str = ''

    for (var i = 0; i < strLength; i++) {
      var ramdomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length))
      str += ramdomCharacter
    }

    return str
  } else {
    return false
  }
}

module.exports = helpers
