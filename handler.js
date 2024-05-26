'use strict';
const httpServer = require('./index')
const serverless = require('serverless-http')
module.exports.hello = serverless(httpServer)
