const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs_list) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs_list.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}