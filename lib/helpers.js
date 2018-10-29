/**
 * Helpers for various tasks
 */

var crypto = require('crypto')
var https = require('https')
var querystring = require('querystring')
var fs = require('fs')
var path = require('path')
var config = require('./config')

// container for helpers
var helpers = {}

// Sample for testing runner
helpers.getANumber = function () {
  return 1
}

// create a SHA256 hash
helpers.hash = function (str) {
  if (typeof (str) === 'string' && str.length > 0) {
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
  strLength = typeof (strLength) === 'number' && strLength > 0 ? strLength : false

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

// Send sms using twilio app
helpers.sendTwilioSms = function (phone, msg, callback) {
  phone = typeof (phone) === 'string' && phone.trim().length === 11 ? phone.trim() : false
  msg = typeof (msg) === 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false

  if (phone && msg) {
    var payload = {
      'From': config.twilio.fromPhone,
      'To': '+55' + phone,
      'Body': msg
    }

    var stringPayload = querystring.stringify(payload)

    var requestDetails = {
      'protocol': 'https:',
      'hostname': 'api.twilio.com',
      'method': 'POST',
      'path': '/2010-04-01/Accounts/' + config.twilio.accountSid + '/Messages.json',
      'auth': config.twilio.accountSid + ':' + config.twilio.authToken,
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(stringPayload)
      }
    }

    var req = https.request(requestDetails, function (res) {
      var status = res.statusCode

      if (status === 200 || status === 201) {
        callback(false)
      } else {
        callback('Status code returned was ' + status)
      }
    })

    req.on('error', function (e) {
      callback(e)
    })

    req.write(stringPayload)

    req.end()
  } else {
    callback('Given parameters were missing or invalid')
  }
}

// Get string contents of a template
helpers.getTemplate = function (templateName, data, callback) {
  templateName = typeof (templateName) === 'string' && templateName.length > 0 ? templateName : false
  data = typeof (data) === 'object' && data !== null ? data : {}

  if (templateName) {
    var templateDir = path.join(__dirname, '../templates/')

    fs.readFile(templateDir + templateName + '.html', 'utf8', function (err, str) {
      if (!err && str && str.length > 0) {
        var finalString = helpers.interpolate(str, data)

        callback(false, finalString)
      } else {
        callback('Template could not be found')
      }
    })
  } else {
    callback('A valid template name was not specified')
  }
}

// Take a given string and a data object and find/replace all the keys with it
helpers.addUniversalTemplates = function (str, data, callback) {
  str = typeof (str) === 'string' && str.length > 0 ? str : ''
  data = typeof (data) === 'object' && data !== null ? data : {}

  helpers.getTemplate('_header', data, function (err, headerTemplate) {
    if (!err && headerTemplate && headerTemplate.length > 0) {
      helpers.getTemplate('_footer', data, function (err, footerTemplate) {
        if (!err && footerTemplate && footerTemplate.length > 0) {
          var fullString = headerTemplate + str + footerTemplate

          callback(false, fullString)
        } else {
          callback('Could not load the footer template')
        }
      })
    } else {
      callback('Could not load the header template')
    }
  })
}

// Take a given string and data object, and find/replace all the keys within it
helpers.interpolate = function (str, data) {
  str = typeof (str) === 'string' && str.length > 0 ? str : ''
  data = typeof (data) === 'object' && data !== null ? data : {}

  for (var keyName in config.templateGlobals) {
    if (config.templateGlobals.hasOwnProperty(keyName)) {
      data['global.' + keyName] = config.templateGlobals[keyName]
    }
  }

  for (var key in data) {
    if (data.hasOwnProperty(key) && typeof (data[key]) === 'string') {
      var replace = data[key]
      var find = '{' + key + '}'

      str = str.replace(find, replace)
    }
  }

  return str
}

// Get contents of static (public) asset
helpers.getStaticAsset = function (fileName, callback) {
  fileName = typeof (fileName) === 'string' && fileName.length > 0 ? fileName : false

  if (fileName) {
    var publicDir = path.join(__dirname, '../public/')

    fs.readFile(publicDir + fileName, function (err, data) {
      if (!err && data) {
        callback(false, data)
      } else {
        callback('No file could be found')
      }
    })
  } else {
    callback('A valid fileName was not specified')
  }
}

module.exports = helpers
