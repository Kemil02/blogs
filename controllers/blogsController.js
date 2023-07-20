const blogRouter = require('express').Router()
const morgan = require('morgan')
const Blog = require('../models/blogModel')

morgan.token('content', (r) => JSON.stringify(r.body))
blogRouter.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))


blogRouter.get('/api/blogs', (request, response) => {

    Blog.find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogRouter.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog.save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogRouter