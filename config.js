var envioriments = {}

envioriments.staging = {
    'httpPort': 3000,
    'httpsPort': 3001,
    'envName': 'staging'
}

envioriments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'production'
}

var currentEnvioriment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : ''

var enviorimentToExport = typeof(envioriments[currentEnvioriment]) === 'object' ? envioriments[currentEnvioriment] : envioriments.staging

module.exports = enviorimentToExport
