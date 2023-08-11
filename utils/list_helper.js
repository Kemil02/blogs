const iodash = require('lodash')

const dummy = (blogs) => {
    return (1)
}

const totalLikes = (blogs) => {
    const sum = (s, b) => { return (s + b) }
    return blogs.length === 0
        ? 0
        : blogs.reduce((s, b) => sum(s, b.likes), 0)
}

const favoriteBlog = (blogs) => {
    const topFinder = (t, b) => {
        return t.likes > b.likes
            ? t
            : b
    }
    return blogs.reduce(topFinder, blogs[0])
}

const mostBlogs = (blogs) => {
    const grouped = iodash.groupBy(blogs, (a) => a.author)
    const sorted = iodash.sortBy(grouped, (a) => { return a[0].length })
    const reversed = iodash.reverse(sorted)
    
    return {
        author: reversed[0][0].author,
        blogs: sorted[0].length
    }
}

const mostLikes = (blogs) => {
    //const sum = (s, n) => { return (s + n) }

    const grouped = iodash.groupBy(blogs, (a) => a.author)
    const mapped = iodash.map(grouped, (g) => {
        return ({
            author: g[0].author,
            likes: totalLikes(g)
        })
    })
    
    const sorted = iodash.sortBy(mapped, (a) => a.likes)
    return (iodash.reverse(sorted)[0])
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}