const { test, describe } = require('node:test')
const assert = require('node:assert')
const { mostLikes } = require('../utils/list_helper')
const { listOfOneBlog, blogsList } = require('./testInput')

describe('top blogger', () => {

    test('of empty list is null', () => {
        assert.deepStrictEqual(mostLikes([]), null)
    })

    test('when list has only one blog equals the author of that', () => {
        assert.deepStrictEqual(mostLikes(listOfOneBlog), {author: 'Michael Chan', likes: 7})
    })

    test('of a bigger list with one top blogger is correct', () => {
        assert.deepStrictEqual(mostLikes(blogsList), {author: 'Edsger W. Dijkstra', likes: 17})
    })

    test('of a bigger list with multiple top bloggers is correct', () => {
        assert.deepStrictEqual(
            mostLikes(
                [...blogsList,
                    {
                        _id: "5a422b891b54a676234d17fa",
                        title: "First class tests",
                        author: "Robert C. Martin",
                        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                        likes: 5,
                        __v: 0
                    },
                ]
            ), 
            {author: 'Edsger W. Dijkstra', likes: 17}
        )
    })
})