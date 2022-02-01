const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Router } = require('express')
const User = require('../models/user')
const loginRouter = require('express').Router()


loginRouter.post('/', async (request, response) =>{
    const {body} = request
    const {username, password} = body

    const user = await User.findOne({username})
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

    if(!user && passwordCorrect){
        response.status(401).json({
            error: 'invalid user password'
        })
    }

    const userForToken = {
        id: user._id,
        username: user.username
    }

    const token = jwt.sign(
        userForToken, 
        process.env.SECRET,
        {
            expiresIn: 60 * 60
        })

    response.send({
        name: user.name,
        username: user.username,
        token
    })

})

module.exports = loginRouter
