'use strict'

const api = module.exports = require('express').Router()

api 
 .use('/led', require('./led'))