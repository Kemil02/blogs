const listHelper = require('../utils/list_helper')
const blogs = require('../utils/testBlogs')

describe('favoriteBlog', () => {
    test('most popular', () => {
        const correctID = '5a422b3a1b54a676234d17f9'

        const result = listHelper.favoriteBlog(blogs)
        expect(result._id).toBe(correctID)

    })

})