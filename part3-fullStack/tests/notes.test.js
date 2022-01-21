const { application } = require('express')
const supertest = require ('supertest')
const app = require('../index')

const api = supertest(app)

test('notes are returned as json', () =>{
    api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})