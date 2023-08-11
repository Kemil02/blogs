
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { init } = require('../models/blogModel')
const Blog = require('../models/blogModel')

const api = supertest(app)

describe('api test', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct number of blogs', async () => {


        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(2)
    })

    test('id exisists', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('create new blog successfully', async () => {

        let response = await api.get('/api/blogs')

        const initialContents = response.body.map(r => r.content)

        const newB = {
            title: 'Sapiens',
            author: 'Yuval Noah Harari',
            url: 'www...com',
            likes: 5,
        }

        response = await api.post('/api/blogs').send(newB)
        expect(response.status).toBe(201)
        expect(response.header['content-type']).toMatch(/application\/json/)

        response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.content)

        expect(contents).toHaveLength(initialContents.length + 1)

    })
    
    test('new blogs without likes will get 0 likes', async () => {

        const newB = {
            title: 'Sapiens',
            author: 'Yuval Noah Harari',
            url: 'www...com'
        }

        let response = await api.post('/api/blogs').send(newB)
        expect(response.status).toBe(201)

        response = await api.get('/api/blogs')

        expect(response.body[2].likes).toBe(0)
    })

    test('blogs without title are not accepted', async () => {
        const newB = {
            author: 'Yuval Noah Harari',
            url: 'www...com',
            likes: 1
        }

        const response = await api.post('/api/blogs').send(newB)
        expect(response.status).toBe(400)
    })

    test('blogs without url are not accepted', async () => {
        const newB = {
            title: 'Sapiens',
            author: 'Yuval Noah Harari',
            likes: 1
        }

        const response = await api.post('/api/blogs').send(newB)
        expect(response.status).toBe(400)
    })

    test('Blog is deleted sucessfully', async () => {
        const initResponse = await api.get('/api/blogs')

        //const initialContents = initResponse.body.map(r => r.content)

        const deleteID = initResponse.body[0].id

        let response = await api.delete(`/api/blogs/${deleteID}`)

        expect(response.status).toBe(204)

        response = await api.get('/api/blogs')

        expect(response.body.length).toBe(initResponse.body.length - 1)

    })

    test('Blog deletion fails with 404 if id is wrong', async () => {
        const initResponse = await api.get('/api/blogs')

        const deleteID = 'abc123'

        let response = await api.delete(`/api/blogs/${deleteID}`)

        expect(response.status).toBe(404)

        response = await api.get('/api/blogs')

        expect(response.body.length).toBe(initResponse.body.length)
    })
})

const initialBlogs = [
    {
        title: 'Rubelcasinot',
        author: 'Staffan Bruun',
        url: 'hbl.fi',
        likes: 5,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    }
]


beforeEach(async () => {
    await Blog.deleteMany({})
    let newBlog = new Blog(initialBlogs[0])
    await newBlog.save()
    newBlog = new Blog(initialBlogs[1])
    await newBlog.save()
})


afterAll(async () => {
    await mongoose.connection.close()
})