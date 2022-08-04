const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const multer = require('multer')
const dotenv = require('dotenv')

const app = express()
const articleRoutes = require('./src/routes/articles')
const register = require('./src/routes/register')
const {storage, fileFilter} = require('./src/utils/multerConfig')
dotenv.config()
app.use("/images", express.static('images'))
app.use(bodyParser.json())
app.use(multer({storage, fileFilter}).single('imgSrc'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    next();
})
app.use('/v1/auth', register)
app.use('/v1/posts',articleRoutes)

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500
    const {message, data} = error

    res.status(status).json({message, data})
})

mongoose.connect(process.env.MONGO_LINK)
    .then(() => {
        app.listen(5000, () => console.log('server listening at http://localhost:5000'))
    })
    .catch(err => console.log(err))
