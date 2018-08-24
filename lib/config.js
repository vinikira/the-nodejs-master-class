var envioriments = {}

envioriments.staging = {
  'httpPort': 3000,
  'httpsPort': 3001,
  'envName': 'staging',
  'hashingSecret': 'thisIsASecret',
  'maxChecks': 5,
  'twilio': {
    'accountSid': 'ACb32d411ad7fe886aac54c665d25e5c5d',
    'authToken': '9455e3eb3109edc12e3d8c92768f7a67',
    'fromPhone': '+15005550006'
  },
  'templateGlobals': {
    'appName': 'UptimeChecker',
    'companyName': 'NotARealCompany, Inc.',
    'yearCreated': '2018',
    'baseUrl': 'http://localhost:3000/'
  }
}

envioriments.production = {
  'httpPort': 5000,
  'httpsPort': 5001,
  'envName': 'production',
  'hashingSecret': 'thisIsAlsoSecret',
  'maxChecks': 5,
  'twilio': {
    'accountSid': '',
    'authToken': '',
    'fromPhone': ''
  },
  'templateGlobals': {
    'appName': 'UptimeChecker',
    'companyName': 'NotARealCompany, Inc.',
    'yearCreated': '2018',
    'baseUrl': 'http://localhost:5000/'
  }
}

var currentEnvioriment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : ''

var enviorimentToExport = typeof(envioriments[currentEnvioriment]) === 'object' ? envioriments[currentEnvioriment] : envioriments.staging

module.exports = enviorimentToExport
