const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { request, response } = require('express')
const User= require('../models/user')

usersRouter.post('/', async (request, response) => {
    const {body} = request
    const {username, name, password} = body
    

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User ({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
    

})

module.exports = usersRouter
