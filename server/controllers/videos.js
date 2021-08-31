const videosRouter = require('express').Router()
const Video = require('../models/video')
const logger = require('../utils/logger')

videosRouter.get('/:id', async (request, response, next) => {
    const videoToGet = await(Video.findById(request.params.id))

    response.json((videoToGet.toJSON()))
})

videosRouter.get('/', async (request, response, next) => {
    response.json('This is the link to all videos')
})

module.exports = videosRouter