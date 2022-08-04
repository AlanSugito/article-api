const express = require('express')
const route = express.Router()

const register = require('../controller/register')
const validator = require("../validator/register")

route.post('/register', validator, register)

module.exports = route