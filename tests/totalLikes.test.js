const listHelper = require('../utils/list_helper')
const blogs = require('../utils/testBlogs')

describe('totalLikes', () => {
    test('sum of likes', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)

    })
    test('with empty array', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })
    
})