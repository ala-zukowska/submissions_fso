const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs_list) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs_list.reduce(reducer, 0)
}

const favoriteBlog = (blogs_list) => {
    if (blogs_list.length === 0){
        return null
    }

    const reducer = (maxLikes, blog) => {
        return maxLikes.likes <= blog.likes ? blog : maxLikes
    }
    
    return blogs_list.reduce(reducer, {likes: 0})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}