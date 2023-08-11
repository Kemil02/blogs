const listHelper = require('../utils/list_helper')
const blogs = require('../utils/testBlogs')

describe('mostLikes', () => {
    test('Author with the most likes', () => {
        const correct = {
            author: 'Edsger W. Dijkstra',
            likes: 17,
        }

        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual(correct)

    })

})

