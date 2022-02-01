const express = require('express')
const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = ''
  console.log('PASO POR antes de decodetoken0')
    console.log(request.get('authorization'))
  if(authorization && authorization.toLowerCase().startsWith('bearer')){
      token = authorization.substring(7)
  }
  console.log('PASO POR antes de decodetoken')
  const decodedToken = jwt.verify(token, process.env.SECRET)
  
  console.log('despues de decodetoken')

   if(!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid'})
   }
   console.log('paso por aqui')

  const {id: userId} = decodedToken
  request.userId = userId

  next()
}