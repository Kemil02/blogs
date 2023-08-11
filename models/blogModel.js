const mongoose = require('mongoose')

const BlogSchema =
    new mongoose.Schema({
        title: String,
        author: String,
        url: String,
        likes: Number
    }, {
        toJSON: {
            transform: (document, returnedObject) => {
                returnedObject.id = returnedObject._id.toString()
                delete returnedObject._id
                delete returnedObject.__v
                if (!returnedObject.likes) {
                    returnedObject.likes = 0
                }
            }
        }
    })

module.exports = mongoose.model('Blog', BlogSchema)