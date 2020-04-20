'use strict'

const led = require('express').Router()

led
.get('/test', (req, res) => {
	res.send('taco')
})

module.exports = led
