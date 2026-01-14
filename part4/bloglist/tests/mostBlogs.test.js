const { test, describe } = require('node:test')
const assert = require('node:assert')
const { mostBlogs } = require('../utils/list_helper')
const { listOfOneBlog, blogsList } = require('./testInput')

describe('most blogs', () => {

    test('of empty list is null', () => {
        assert.deepStrictEqual(mostBlogs([]), null)
    })

    test('when list has only one blog equals the author of that', () => {
        assert.deepStrictEqual(mostBlogs(listOfOneBlog), {author: 'Michael Chan', blogs: 1})
    })

    test('of a bigger list with one author with most blogs is correct', () => {
        assert.deepStrictEqual(mostBlogs(blogsList), {author: 'Robert C. Martin', blogs: 3})
    })

    test('of a bigger list with multiple authors with most blogs is correct', () => {
        assert.deepStrictEqual(
            mostBlogs(
                [...blogsList,
                    {
                        _id: "5a422b3a1b54a676234d17f9",
                        title: "Canonical string reduction",
                        author: "Edsger W. Dijkstra",
                        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                        likes: 12,
                        __v: 0
                    },
                ]
            ), 
            {author: 'Edsger W. Dijkstra', blogs: 3}
        )
    })
})