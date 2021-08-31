const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body
    const password = body.password

    if (password.length < 3) {
        return response.status(400).json({
            error: 'password is too short'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

module.exports = usersRouter