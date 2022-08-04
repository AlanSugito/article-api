const User = require("../models/register")

const {validationResult} = require("express-validator")

const register = (req, res, next) => {
    const {
        username,
        email,
        password,
    } = req.body

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        const err = new Error("Invalid input format")
        err.errorStatus = 400
        err.data = errors.array()
        throw err
    }

    const user = new User({username, email, password})
    user.save()
    .then(() => {

        res.status(201).json({
            status: "success",
            message: "Registration Success",
        })
    })
    .catch(err => next(err))
}

module.exports = register