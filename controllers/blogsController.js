const blogRouter = require('express').Router()
const morgan = require('morgan')
const Blog = require('../models/blogModel')
const mongoose = require('mongoose')

morgan.token('content', (r) => JSON.stringify(r.body))
blogRouter.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))


blogRouter.get('/api/blogs', async (request, response) => {

    const blogs = await Blog.find({})

    response.json(blogs)

})

blogRouter.post('/api/blogs', async (request, response) => {

    if (!request.body.url || !request.body.title) {
        response.status(400).json('Bad request')
    }
    else {
        const blog = new Blog(request.body)

        const res = await blog.save()

        response.status(201).json(res)
    }

})

blogRouter.delete('/api/blogs/:id', async (request, response) => {
    const inputID = request.params.id

    if (!mongoose.isValidObjectId(inputID)) {
        response.status(404).end()
    }
    else {
        const blogExists = await Blog.exists({ _id: inputID })

        if (blogExists) {

            await Blog.findByIdAndRemove(inputID)

            response.status(204).end()
        }
        else {
            response.status(404).end()
        }
    }
}) 

module.exports = blogRouter