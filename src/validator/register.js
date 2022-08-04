const {body} = require('express-validator')

const validator = [
    body('email', "Please insert a valid email format").isEmail(),
    body('password', 'Password need at least 8 character').isLength({min: 8})
]

module.exports = validator