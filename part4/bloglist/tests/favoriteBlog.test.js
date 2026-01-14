const { test, describe } = require('node:test')
const assert = require('node:assert')
const { favoriteBlog } = require('../utils/list_helper')
const { listOfOneBlog, blogsList } = require('./testInput')

describe('favourite blog', () => {

    test('of empty list is null', () => {
        assert.strictEqual(favoriteBlog([]), null)
    })

    test('when list has only one blog equals that blog object', () => {
        assert.deepStrictEqual(
            favoriteBlog(listOfOneBlog), 
            {
                _id: "5a422a851b54a676234d17f7",
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7,
                __v: 0
            }
        )
    })

    test('of a bigger list with one favourite blog is correct', () => {
        assert.deepStrictEqual(
            favoriteBlog(blogsList), 
            {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
                __v: 0
            }
        )
    })

    test('of a bigger list with multiple favourite blogs is correct', () => {
        assert.deepStrictEqual(
            favoriteBlog(
                [...blogsList, 
                    {
                        _id: "69654fe9f9df91e16434f7f1",
                        title: "KittyClysm",
                        author: "Elise Xavier",
                        url: "https://kittyclysm.com/",
                        likes: 12,
                        __v: 0
                    }
                ]
            ), 
            {
                _id: "69654fe9f9df91e16434f7f1",
                title: "KittyClysm",
                author: "Elise Xavier",
                url: "https://kittyclysm.com/",
                likes: 12,
                __v: 0
            }
        )
    })
})
