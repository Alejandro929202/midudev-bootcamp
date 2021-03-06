const bcrypt = require('bcrypt')
const { TestScheduler } = require('jest')
const User = require('../models/User')
const { api, getUsers } = require('./helpers')
const moongose = require('mongoose')
const { server} = require('../index')

describe('Creating a new user', () =>{
    beforeEach(async () =>{
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('pswd', 10)
        const user = new User({username:'alex', passwordHash})

        await user.save()
    })

    test('works as expected creatin a fresh username', async () =>{
        
        const userAtStart = await getUsers()

        const newUser = {
            username: 'alejandro',
            name: 'alex',
            password: 'HPS'
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        
        const userAtEnd = await getUsers()

        expect(userAtEnd).toHaveLength(userAtStart.length +1)

        const usernames = userAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username is alreade taken', 
    async () =>{
        const userAtStart = await getUsers()

        const newUser = {
            username: 'miduroot',
            name: 'Miguel',
            password: 'midutest'
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')
        const userAtEnd = await getUsers()
        expect(userAtEnd).toHaveLength(userAtStart.length)
    })

    afterAll(() => {
        moongose.connection.close()
        server.close()
    })
})

