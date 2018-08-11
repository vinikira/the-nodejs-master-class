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
// @TODO only let an authenticated user access their object
handlers._users.get = function (data, callback) {
  var phone = typeof(data.queryStringObject.phone) === 'string' && data.queryStringObject.phone.length === 11 ? data.queryStringObject.phone : false

  if (phone) {
    _data.read('users', phone, function (err, data) {
      if (!err && data) {
        delete data.hashedPassword

        callback(200, data)
      } else {
        callback(404)
      }
    })
  } else {
    callback(400, {'Error': 'Missing required field'})
  }
}

// users put
// @TODO only let an authenticated user update their own object
handlers._users.put = function (data, callback) {
  var phone = typeof(data.payload.phone) === 'string' && data.payload.phone.length === 11 ? data.payload.phone : false

  var firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false
  var lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName : false
  var password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false

  if (phone) {
    if (firstName || lastName || password) {
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
      callback(400, {'Error': 'Missing fields to update'})
    }
  } else {
    callback(400, {'Error': 'Missing required field'})
  }
}

// users delete
// @TODO only let an authenticated user delete their own object
//@TODO Clean up (delete) any other file associated with this user
handlers._users.delete = function (data, callback) {
  var phone = typeof(data.queryStringObject.phone) === 'string' && data.queryStringObject.phone.length === 11 ? data.queryStringObject.phone : false

  if (phone) {
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
