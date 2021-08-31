const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const videosRouter = require('./controllers/videos')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
// const morgan = require('morgan')
require('express-async-errors')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(
    config.MONGODB_URI,
    async(error)=>{
        if(error) throw error;
        console.log(`connected to MongoDB app.js`)
    }
)

app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'index'
}))

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(middleware.requestLogger)

app.get('/', (request, response) => {
    response.render('main')
})
app.use('/api/videos', videosRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app