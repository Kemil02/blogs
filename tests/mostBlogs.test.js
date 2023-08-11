const listHelper = require('../utils/list_helper')
const blogs = require('../utils/testBlogs')

describe('mostBlogs', () => {
    test('Author with the most blogs', () => {
        const correct = {
            author: 'Robert C. Martin',
            blogs: 3
        }

        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(correct)

    })

})