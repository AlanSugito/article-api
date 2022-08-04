const {body} = require('express-validator')

const validator = [
    body('headline', "out of minimum or maximum length").isLength({min: 10, max: 70}),
    body('imgSrc', "File extension should be png/jpg/jpeg"),
    body('content', "Minimum characther length is 20").isLength({min: 20})
]

module.exports = validator