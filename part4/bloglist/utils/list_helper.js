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

const mostBlogs = (blogs_list) => {
    if (blogs_list.length === 0){
        return null
    }

    const authors = {}

    blogs_list.forEach((element) => {
        if (!(element.author in authors)) {
            authors[element.author] = 0
        }
        authors[element.author] += 1
    })

    const authors_entries = Object.entries(authors)
    authors_entries.sort((a, b) => b[1] - a[1])

    return {author: authors_entries[0][0], blogs: authors_entries[0][1]}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}