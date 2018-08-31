/**
 * Request handlers
 */
var _data = require('./data')
var config = require('./config')
var helpers = require('./helpers')

var handlers = {}

/**
 * HTML handlers
 */

handlers.index = function (data, callback) {
  if (data.method === 'get') {
    var templateData = {
      'head.title': 'Uptime Monitoring - Made Simple',
      'head.description': 'We offer free, simple uptime monitoring for HTTP/HTTPS sites all kinds. When you site goes down, we\'ll send you a text to let you know',
      'body.class': 'index'
    }

    helpers.getTemplate('index', templateData, function (err, str) {
      if (!err && str && str.length > 0) {
        helpers.addUniversalTemplates(str, templateData, function (err, newStr) {
          if (!err && newStr && newStr.length > 0) {
            callback(200, newStr, 'html')
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback(500, undefined, 'html')
      }
    })
  } else {
    callback(405, undefined, 'html')
  }
}

handlers.accountCreate = function (data, callback) {
  if (data.method === 'get') {
    var templateData = {
      'head.title': 'Create an Account',
      'head.description': 'Signup is easy and only takes a few seconds.',
      'body.class': 'accountCreate'
    }

    helpers.getTemplate('accountCreate', templateData, function (err, str) {
      if (!err && str && str.length > 0) {
        helpers.addUniversalTemplates(str, templateData, function (err, newStr) {
          if (!err && newStr && newStr.length > 0) {
            callback(200, newStr, 'html')
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback(500, undefined, 'html')
      }
    })
  } else {
    callback(405, undefined, 'html')
  }
}

handlers.sessionCreate = function (data, callback) {
  if (data.method === 'get') {
    var templateData = {
      'head.title': 'Login to your account',
      'head.description': 'Please enter your phone number and password to access your account.',
      'body.class': 'sessionCreate'
    }

    helpers.getTemplate('sessionCreate', templateData, function (err, str) {
      if (!err && str && str.length > 0) {
        helpers.addUniversalTemplates(str, templateData, function (err, newStr) {
          if (!err && newStr && newStr.length > 0) {
            callback(200, newStr, 'html')
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback(500, undefined, 'html')
      }
    })
  } else {
    callback(405, undefined, 'html')
  }
}

handlers.sessionDeleted = function (data, callback) {
  if (data.method === 'get') {
    var templateData = {
      'head.title': 'Logged Out',
      'head.description': 'You have been logged out of your account.',
      'body.class': 'sessionDeleted'
    }

    helpers.getTemplate('sessionDeleted', templateData, function (err, str) {
      if (!err && str && str.length > 0) {
        helpers.addUniversalTemplates(str, templateData, function (err, newStr) {
          if (!err && newStr && newStr.length > 0) {
            callback(200, newStr, 'html')
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback(500, undefined, 'html')
      }
    })
  } else {
    callback(405, undefined, 'html')
  }
}

handlers.accountEdit = function (data, callback) {
  if (data.method === 'get') {
    var templateData = {
      'head.title': 'Account Settings',
      'body.class': 'accountEdit'
    }

    helpers.getTemplate('accountEdit', templateData, function (err, str) {
      if (!err && str && str.length > 0) {
        helpers.addUniversalTemplates(str, templateData, function (err, newStr) {
          if (!err && newStr && newStr.length > 0) {
            callback(200, newStr, 'html')
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback(500, undefined, 'html')
      }
    })
  } else {
    callback(405, undefined, 'html')
  }
}

handlers.accountDeleted = function (data, callback) {
  if (data.method === 'get') {
    var templateData = {
      'head.title': 'Account deleted',
      'head.description': 'Your account has been deleted',
      'body.class': 'accountDeleted'
    }

    helpers.getTemplate('accountDeleted', templateData, function (err, str) {
      if (!err && str && str.length > 0) {
        helpers.addUniversalTemplates(str, templateData, function (err, newStr) {
          if (!err && newStr && newStr.length > 0) {
            callback(200, newStr, 'html')
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback(500, undefined, 'html')
      }
    })
  } else {
    callback(405, undefined, 'html')
  }
}

handlers.checksCreate = function (data, callback) {
  if (data.method === 'get') {
    var templateData = {
      'head.title': 'Create a check',
      'body.class': 'checksCreate'
    }

    helpers.getTemplate('checksCreate', templateData, function (err, str) {
      if (!err && str && str.length > 0) {
        helpers.addUniversalTemplates(str, templateData, function (err, newStr) {
          if (!err && newStr && newStr.length > 0) {
            callback(200, newStr, 'html')
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback(500, undefined, 'html')
      }
    })
  } else {
    callback(405, undefined, 'html')
  }
}

handlers.checksList = function (data, callback) {
  if (data.method === 'get') {
    var templateData = {
      'head.title': 'Dashboard',
      'body.class': 'checksList'
    }

    helpers.getTemplate('checksList', templateData, function (err, str) {
      if (!err && str && str.length > 0) {
        helpers.addUniversalTemplates(str, templateData, function (err, newStr) {
          if (!err && newStr && newStr.length > 0) {
            callback(200, newStr, 'html')
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback(500, undefined, 'html')
      }
    })
  } else {
    callback(405, undefined, 'html')
  }
}


helpers.favicon = function (data, callback) {
  if (data.method === 'get') {
    helpers.getStaticAsset('favicon.ico', function (err, data) {
      if (!err && data) {
        callback(false, data, 'favicon')
      } else {
        callback(500)
      }
    })
  } else {
    callback(405)
  }
}

handlers.public = function (data, callback) {
  if (data.method === 'get') {
    var trimmedAssetName = data.trimmedPath.replace('public/', '').trim()

    if (trimmedAssetName.length > 1) {
      helpers.getStaticAsset(trimmedAssetName, function (err, data) {
        if (!err && data) {
          var contentType = 'plain'

          if (trimmedAssetName.indexOf('.css') > -1) {
            contentType = 'css'
          }

          if (trimmedAssetName.indexOf('.png') > -1) {
            contentType = 'png'
          }

          if (trimmedAssetName.indexOf('.jpg') > -1) {
            contentType = 'jpg'
          }

          if (trimmedAssetName.indexOf('.ico') > -1) {
            contentType = 'favicon'
          }

          callback(false, data, contentType)
        } else {
          callback(500)
        }
      })
    } else {
      callback(404)
    }
  } else {
    callback(405)
  }
}


/**
 * JSON Handlers
 */

// user handler
handlers.users = function (data, callback) {
  var acceptableMethods = ['get', 'post', 'put', 'delete']

  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback)
  } else {
    callback(405)
  }
}

// container for the user submethods
handlers._users = {}

// users post
handlers._users.post = function (data, callback) {
  var firstName = typeof (data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false
  var lastName = typeof (data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName : false
  var phone = typeof (data.payload.phone) === 'string' && data.payload.phone.trim().length === 11 ? data.payload.phone : false
  var password = typeof (data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false
  var tosAgreement = typeof (data.payload.tosAgreement) === 'boolean' && data.payload.tosAgreement ? true : false

  if (firstName && lastName && phone && password && tosAgreement) {
    _data.read('users', phone, function (err, data) {
      if (err) {
        var hashedPassword = helpers.hash(password)

        if (hashedPassword) {
          var user = {
            'firstName': firstName,
            'lastName': lastName,
            'phone': phone,
            'hashedPassword': hashedPassword,
            'tosAgreement': true
          }

          _data.create('users', phone, user, function (err) {
            if (err) {
              callback(500, {'Error': 'Could not create the new user.'})
            } else {
              callback(200)
            }
          })
        } else {
          callback(500, {'Error': 'Could not hash the password.'})
        }
      } else {
        callback(400, {'Error': 'A user with that phone number already exists'})
      }
    })
  } else {
    callback(400, { 'Error': 'Missing required fields'})
  }
}

// users get
handlers._users.get = function (data, callback) {
  var phone = typeof (data.queryStringObject.phone) === 'string' && data.queryStringObject.phone.length === 11 ? data.queryStringObject.phone : false

  if (phone) {
    var token = typeof (data.headers.token) === 'string' ? data.headers.token : false

    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
      if (tokenIsValid) {
        _data.read('users', phone, function (err, data) {
          if (!err && data) {
            delete data.hashedPassword

            callback(200, data)
          } else {
            callback(404)
          }
        })
      } else {
        callback(403, {'Error': 'Missing required token in header or token is invalid'})
      }
    })
  } else {
    callback(400, {'Error': 'Missing required field'})
  }
}

// users put
handlers._users.put = function (data, callback) {
  var phone = typeof (data.payload.phone) === 'string' && data.payload.phone.length === 11 ? data.payload.phone : false

  var firstName = typeof (data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false
  var lastName = typeof (data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName : false
  var password = typeof (data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false

  if (phone) {
    if (firstName || lastName || password) {
      var token = typeof (data.headers.token) === 'string' ? data.headers.token : false

      handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
        if (tokenIsValid) {
          _data.read('users', phone, function (err, userData) {
            if (!err && userData) {
              if (firstName) {
                userData.firstName = firstName
              }

              if (lastName) {
                userData.lastName = lastName
              }

              if (password) {
                userData.hashedPassword = helpers.hash(password)
              }

              _data.update('users', phone, userData, function (err) {
                if (!err) {
                  callback(200)
                } else {
                  console.log(err)
                  callback(500, {'Error': 'Could not update the user.'})
                }
              })
            } else {
              callback(400, {'Error': 'The specified user does not exist'})
            }
          })
        } else {
          callback(403, {'Error': 'Missing required token in header or token is invalid'})
        }
      })
    } else {
      callback(400, {'Error': 'Missing fields to update'})
    }
  } else {
    callback(400, {'Error': 'Missing required field'})
  }
}

// users delete
// @TODO Clean up (delete) any other file associated with this user
handlers._users.delete = function (data, callback) {
  var phone = typeof (data.queryStringObject.phone) === 'string' && data.queryStringObject.phone.length === 11 ? data.queryStringObject.phone : false

  if (phone) {
    var token = typeof (data.headers.token) === 'string' ? data.headers.token : false

    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
      if (tokenIsValid) {
        _data.read('users', phone, function (err, userData) {
          if (!err && userData) {
            _data.delete('users', phone, function (err) {
              if (!err) {
                var userChecks = typeof (userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : []
                var checksToDelete = userChecks.length

                if (checksToDelete > 0) {
                  var checksDeleted = 0
                  var deletionErrors = false

                  userChecks.forEach(function (checkId) {
                    _data.delete('checks', checkId, function (err) {
                      if (err) {
                        deletionErrors = true
                      } else {
                        checksDeleted++
                      }
                    })
                  })

                  if (checksDeleted === checksToDelete && !deletionErrors) {
                    callback(200)
                  } else {
                    callback(500, {'Error': 'Errors encountered while attempting to delete all of the user\'s checks. All checks may not have been deleted from the system successfully.'})
                  }
                } else {
                  callback(200)
                }
              } else {
                callback(500, {'Error': 'Coluld not delete the specified user'})
              }
            })
          } else {
            callback(400, {'Error': 'Colud not find the specified user'})
          }
        })
      } else {
        callback(403, {'Error': 'Missing required token in header or token is invalid'})
      }
    })
  } else {
    callback(400, {'Error': 'Missing required fields'})
  }
}

// tokens handler
handlers.tokens = function (data, callback) {
  var acceptableMethods = ['get', 'post', 'put', 'delete']

  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data, callback)
  } else {
    callback(405)
  }
}

// container for the all tokens submethods
handlers._tokens = {}

// token post
handlers._tokens.post = function (data, callback) {
  var phone = typeof (data.payload.phone) === 'string' && data.payload.phone.trim().length === 11 ? data.payload.phone : false
  var password = typeof (data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false

  if (phone && password) {
    _data.read('users', phone, function (err, userData) {
      if (!err && userData) {
        var hashedPassword = helpers.hash(password)

        if (hashedPassword === userData.hashedPassword) {
          var tokenId = helpers.createRandomString(20)
          var expires = Date.now() + 1000 * 60 * 60
          var tokenObject = {
            'phone': phone,
            'id': tokenId,
            'expires': expires
          }

          _data.create('tokens', tokenId, tokenObject, function (err) {
            if (!err) {
              callback(200, tokenObject)
            } else {
              callback(500, {'Error': 'Could not create then new token '})
            }
          })
        } else {
          callback(400, {'Error': 'Password did not match with the specified user\'s stored password'})
        }
      } else {
        callback(400, {'Error': 'Could not find the specified user'})
      }
    })
  } else {
    callback(400, {'Error': 'Missing required fields'})
  }
}

// token get
handlers._tokens.get = function (data, callback) {
  var id = typeof (data.queryStringObject.id) === 'string' && data.queryStringObject.id.length === 20 ? data.queryStringObject.id : false

  if (id) {
    _data.read('tokens', id, function (err, data) {
      if (!err && data) {
        callback(200, data)
      } else {
        callback(404)
      }
    })
  } else {
    callback(400, {'Error': 'Missing required field'})
  }
}

// token put
handlers._tokens.put = function (data, callback) {
  var id = typeof (data.payload.id) === 'string' && data.payload.id.length === 20 ? data.payload.id : false
  var extend = typeof (data.payload.extend) === 'boolean' && data.payload.extend ? true: false

  if (id && extend) {
    _data.read('tokens', id, function (err, tokenData) {
      if (!err && tokenData) {
        if (tokenData.expires > Date.now()) {
          tokenData.expires = Date.now() + 1000 * 60 * 60

          _data.update('tokens', id, tokenData, function (err) {
            if (!err) {
              callback(200)
            } else {
              callback(500, {'Error': 'Could not update the token\'s expiration.'})
            }
          })
        } else {
          callback(400, {'Error': 'Then token already expired and cannot be extended.'})
        }
      } else {
        callback(400, {'Error': 'Specified token does not exists.'})
      }
    })
  } else {
    callback(400, {'Error': 'Missing required fields'})
  }
}

// token delete
handlers._tokens.delete = function (data, callback) {
  var id = typeof (data.queryStringObject.id) === 'string' && data.queryStringObject.id.length === 20 ? data.queryStringObject.id : false

  if (id) {
    _data.read('tokens', id, function (err, data) {
      if (!err && data) {
        _data.delete('tokens', id, function (err) {
          if (!err) {
            callback(200)
          } else {
            callback(500, {'Error': 'Coluld not delete the specified token'})
          }
        })
      } else {
        callback(400, {'Error': 'Colud not find the specified token'})
      }
    })
  } else {
    callback(400, {'Error': 'Missing required fields'})
  }
}

handlers._tokens.verifyToken = function (id, phone, callback) {
  _data.read('tokens', id, function (err, tokenData) {
    if (!err && tokenData) {
      if (phone === tokenData.phone && tokenData.expires > Date.now()) {
        callback(true)
      } else {
        callback(false)
      }
    } else {
      callback(false)
    }
  })
}

// checks  handler
handlers.checks = function (data, callback) {
  var acceptableMethods = ['get', 'post', 'put', 'delete']

  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._checks[data.method](data, callback)
  } else {
    callback(405)
  }
}

// container for the all checks methods
handlers._checks = {}

// checks post
handlers._checks.post = function (data, callback) {
  var protocol = typeof (data.payload.protocol) === 'string' && ['http', 'https'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false
  var url = typeof (data.payload.url) === 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false
  var method = typeof (data.payload.method) === 'string' && ['get', 'post', 'put', 'delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false
  var successCodes = typeof (data.payload.successCodes) === 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false
  var timeoutSeconds = typeof (data.payload.timeoutSeconds) === 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false

  if (protocol && url && method && successCodes && timeoutSeconds) {
    var token = typeof (data.headers.token) === 'string' ? data.headers.token : false

    _data.read('tokens', token, function (err, tokenData) {
      if (!err && tokenData && tokenData.expires > Date.now()) {
        var userPhone = tokenData.phone

        _data.read('users', userPhone, function (err, userData) {
          var userChecks = typeof (userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : []

          if (!err && userData) {
            if (userChecks.length <= config.maxChecks) {
              var checkId = helpers.createRandomString(20)

              var checkObject = {
                'id': checkId,
                'userPhone': userPhone,
                'protocol': protocol,
                'url': url,
                'method': method,
                'successCodes': successCodes,
                'timeoutSeconds': timeoutSeconds
              }

              _data.create('checks', checkId, checkObject, function (err) {
                if (!err) {
                  userData.checks = userChecks
                  userData.checks.push(checkId)

                  _data.update('users', userPhone, userData, function (err) {
                    if (!err) {
                      callback(200, checkObject)
                    } else {
                      callback(500, {'Error': 'Could not update the user with the new check'})
                    }
                  })
                } else {
                  callback(500, {'Error': 'Could not create the new check'})
                }
              })
            } else {
              callback(400, {'Error': 'The user already has the maximum number of checks (' + config.maxChecks + ')'})
            }
          } else {
            callback(403, {'Error': 'User not found'})
          }
        })
      } else {
        callback(403, {'Error': 'Missing required token in header or token is invalid'})
      }
    })
  } else {
    callback(400, {'Error': 'Missing required inputs, or inputs are invalid'})
  }
}

// checks get
handlers._checks.get = function (data, callback) {
  var id = typeof (data.queryStringObject.id) === 'string' && data.queryStringObject.id.length === 20 ? data.queryStringObject.id : false

  if (id) {
    _data.read('checks', id, function (err, checkData) {
      if (!err && checkData) {
        var token = typeof (data.headers.token) === 'string' ? data.headers.token : false

        handlers._tokens.verifyToken(token, checkData.userPhone, function (tokenIsValid) {
          if (tokenIsValid) {
            callback(200, checkData)
          } else {
            callback(403)
          }
        })
      } else {
        callback(404)
      }
    })
  } else {
    callback(400, {'Error': 'Missing required field'})
  }
}

// checks put
handlers._checks.put = function (data, callback) {
  var id = typeof (data.payload.id) === 'string' && data.payload.id.length === 20 ? data.payload.id : false

  var protocol = typeof (data.payload.protocol) === 'string' && ['http', 'https'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false
  var url = typeof (data.payload.url) === 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false
  var method = typeof (data.payload.method) === 'string' && ['get', 'post', 'put', 'delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false
  var successCodes = typeof (data.payload.successCodes) === 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false
  var timeoutSeconds = typeof (data.payload.timeoutSeconds) === 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false

  if (id) {
    if (protocol || url || method || successCodes || timeoutSeconds) {
      _data.read('checks', id, function (err, checkData) {
        if (!err && checkData) {
          var token = typeof (data.headers.token) == 'string' ? data.headers.token : false

          handlers._tokens.verifyToken(token, checkData.userPhone, function (tokenIsValid) {
            if (tokenIsValid) {
              if (protocol) {
                checkData.protocol = protocol
              }

              if (url) {
                checkData.url = url
              }

              if (method) {
                checkData.method = method
              }

              if (successCodes) {
                checkData.successCodes = successCodes
              }

              if (timeoutSeconds) {
                checkData.timeoutSeconds = timeoutSeconds
              }

              _data.update('checks', id, checkData, function (err) {
                if (!err) {
                  callback(200)
                } else {
                  callback(500, {'Error': 'Could not update the check'})
                }
              })
            } else {
              callback(403)
            }
          })
        } else {
          callback(404, {'Error': 'Check not found'})
        }
      })
    } else {
      callback(400, {'Error': 'Missing fields to update'})
    }
  } else {
    callback(400, {'Error': 'Missing required fields'})
  }
}

// checks delete
handlers._checks.delete = function (data, callback) {
  var id = typeof (data.queryStringObject.id) === 'string' && data.queryStringObject.id.length === 20 ? data.queryStringObject.id : false

  if (id) {
    _data.read('checks', id, function (err, checkData) {
      if (!err && checkData) {
        var token = typeof (data.headers.token) == 'string' ? data.headers.token : false

        handlers._tokens.verifyToken(token, checkData.userPhone, function (tokenIsValid) {
          if (tokenIsValid) {
            _data.delete('checks', id, function (err) {
              if (!err) {
                _data.read('users', checkData.userPhone, function (err, userData) {
                  if (!err && userData) {
                    var userChecks = typeof (userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : []

                    var checkPosition = userChecks.indexOf(id)

                    if (checkPosition > -1) {
                      userChecks.splice(checkPosition, 1)

                      userData.checks = userChecks

                      _data.update('users', checkData.userPhone, userData, function (err) {
                        if (!err) {
                          callback(200)
                        } else {
                          callback(500, {'Error': 'Could not update the user object'})
                        }
                      })
                    } else {
                      callback(500,{'Error' : 'Could not find the check on the user\'s object, so could not remove it.'})
                    }
                  } else {
                    callback(500, {'Error': 'Colud not found the user that created the check'})
                  }
                })
              } else {
                callback(500, {'Error': 'Coluld not delete the specified check'})
              }
            })
          } else {
            callback(403)
          }
        })
      } else {
        callback(400, {'Error': 'Colud not find the specified check'})
      }
    })
  } else {
    callback(400, {'Error': 'Missing required fields'})
  }
}

// ping handler
handlers.ping = function (data, callback) {
  callback(200, { message: 'pong' })
}

// not found handler
handlers.notFound = function (data, callback) {
  callback(404)
}

module.exports = handlers
