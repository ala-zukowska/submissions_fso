const { test, describe } = require('node:test')
const assert = require('node:assert')
const { totalLikes } = require('../utils/list_helper')
const { listOfOneBlog, blogsList } = require('./testInput')

describe('total likes', () => {

    test('of empty list is zero', () => {
        assert.strictEqual(totalLikes([]), 0)
    })

    test('when list has only one blog equals the likes of that', () => {
        assert.strictEqual(totalLikes(listOfOneBlog), 7)
    })

    test('of a bigger list is calculated right', () => {
        assert.strictEqual(totalLikes(blogsList), 36)
    })
})