/* global XMLHttpRequest */
var app = {}

app.config = {
  sessionToken: false
}

app.client = {}

app.client.request = function (headers, path, method, queryStringObject, payload, callback) {
  headers = typeof (headers) === 'object' && headers !== null ? headers : {}
  path = typeof (path) === 'string' ? path : '/'
  method = typeof (method) === 'string' && ['GET', 'POST', 'PUT', 'DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET'
  queryStringObject = typeof (queryStringObject) === 'object' && queryStringObject !== null ? queryStringObject : {}
  payload = typeof (payload) === 'object' && payload !== null ? payload : {}
  callback = typeof (callback) === 'function' ? callback : false

  var requestUrl = path + '?'
  var counter = 0

  for (var queryKey in queryStringObject) {
    if (queryStringObject.hasOwnProperty(queryKey)) {
      if (counter > 1) {
        requestUrl += '&'
      }

      requestUrl += queryKey + '=' + queryStringObject[queryKey]
    }
  }

  var xhr = new XMLHttpRequest()

  xhr.open(method, requestUrl, true)

  xhr.setRequestHeader('Content-type', 'application/json')

  for (var headerKey in headers) {
    if (headers.hasOwnProperty(headerKey)) {
      xhr.setRequestHeader(headerKey, headers[headerKey])
    }
  }

  if (app.config.sessionToken) {
    xhr.setRequestHeader('token', app.config.sessionToken.id)
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      var statusCode = xhr.status
      var responseReturned = xhr.responseText

      if (callback) {
        try {
          var parsedResponse = JSON.parse(responseReturned)

          callback(statusCode, parsedResponse)
        } catch (err) {
          callback(statusCode, false)
        }
      }
    }
  }

  var payloadString = JSON.stringify(payload)

  xhr.send(payloadString)
}
