/**
 * Request handlers
 */
var _data = require('./data')
var helpers = require('./helpers')

var handlers = {}

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
  var firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false
  var lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName : false
  var phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length === 11 ? data.payload.phone : false
  var password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false
  var tosAgreement = typeof(data.payload.tosAgreement) === 'boolean' && data.payload.tosAgreement ? true : false

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
  var phone = typeof(data.queryStringObject.phone) === 'string' && data.queryStringObject.phone.length === 11 ? data.queryStringObject.phone : false

  if (phone) {
    var token = typeof(data.headers.token) === 'string' ? data.headers.token : false

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
  var phone = typeof(data.payload.phone) === 'string' && data.payload.phone.length === 11 ? data.payload.phone : false

  var firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false
  var lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName : false
  var password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false

  if (phone) {
    if (firstName || lastName || password) {
          var token = typeof(data.headers.token) === 'string' ? data.headers.token : false

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
                userData.password = helpers.hash(password)
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
  var phone = typeof(data.queryStringObject.phone) === 'string' && data.queryStringObject.phone.length === 11 ? data.queryStringObject.phone : false

  if (phone) {
    var token = typeof(data.headers.token) === 'string' ? data.headers.token : false

    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
      if (tokenIsValid) {
        _data.read('users', phone, function (err, data) {
          if (!err && data) {
            _data.delete('users', phone, function (err) {
              if (!err) {
                callback(200)
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
  var phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length === 11 ? data.payload.phone : false
  var password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false

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
          callback(400, {'Error': 'Password did not match with the specified user\'sstored password'})
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
  var id = typeof(data.queryStringObject.id) === 'string' && data.queryStringObject.id.length === 20 ? data.queryStringObject.id : false

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
  var id = typeof(data.payload.id) === 'string' && data.payload.id.length === 20 ? data.payload.id : false
  var extend = typeof(data.payload.extend) === 'boolean' && data.payload.extend ? true: false

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
  var id = typeof(data.queryStringObject.id) === 'string' && data.queryStringObject.id.length === 20 ? data.queryStringObject.id : false

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

// ping handler
handlers.ping = function (data, callback) {
  callback(200, { message: 'pong' })
}

// not found handler
handlers.notFound = function (data, callback) {
  callback(404)
}

module.exports = handlers
