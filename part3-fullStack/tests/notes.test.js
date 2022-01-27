const { application } = require('express')
const moongose = require('mongoose')

const {app, server} = require('../index')

const Note = require('../models/Note')

const {
    api,
    initialNotes,
    getAllContentFromNotes
} = require('./helpers')


beforeEach(async () =>{
    await Note.deleteMany({})

    //insercion en paralelo no tienen porque insertarse en el mismo orden
    // const notesObjects = initialNotes.map(note => new Note(note))
    // const promises = notesObjects.map(note => note.save())
    // await Promise.all(promises)
    
    //insercion secuencial
    for(let note of initialNotes){
        const noteObject = new Note(note)
        await noteObject.save()
    }

})

describe('GET ALL noter', () =>{
    test('notes are returned as json', async () =>{
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('there are two notes', async () =>{
        const response = await api.get('/api/notes')
        expect(response.body).toHaveLength(initialNotes.length)
    })
    test('the first note is about alex', async () =>{
        const {
            contents
        } = await getAllContentFromNotes()
        
        expect(contents).toContain('Aprendiendo full stack')
    })
})

describe('create a note', () =>{
    test('is possible with a valid note', async () =>{
        const newNote = {
            content: 'Proximamente async/await',
            important:true
        }
    
        await api
        .post('/api/notes')
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
        const {contents, response} =  await getAllContentFromNotes()
    
        expect(response.body).toHaveLength(initialNotes.length + 1)
        expect(contents).toContain(newNote.content)
    })
    
    test('is not possible a valid note', async () =>{
        const newNote = {
            important:true
        }
    
        await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/notes')
    
        
        expect(response.body).toHaveLength(initialNotes.length)
    })
})



test('a note can be deleted', async () =>{
    const { response: firstResponse } = await getAllContentFromNotes()
    const { body: notes } = firstResponse
    const noteToDelete = notes [0]

    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

        const { contents, response: secondResponse } = await getAllContentFromNotes()
        expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
        expect(contents).not.toContain(noteToDelete.content)
})

test.skip('a note that do not exist can not be deleted', async () =>{
    await api
        .delete('/api/notes/1234')
        .expect(400)

        const { response } = await getAllContentFromNotes()
        expect(response.body).toHaveLength(initialNotes.length)
        
})

afterAll(() => {
    moongose.connection.close()
    server.close()
})