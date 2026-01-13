const mongoose = require('mongoose')

mongoose.set('setDefaultsOnInsert', false);

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required!'],
    unique: true,
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Blog author is required!'],
    unique: true,
    trim: true,
  },
  url: {
    type: String,
    required: [true, 'Blog url is required!'],
    unique: true,
    trim: true,
    validate: {
      validator: function(value) {
        return /^https?:\/\/[^\s\/]+[^\s]*$/.test(value) //a *very very* simple url validation//
      },
      message: props => `${props.value} is not a valid url!`
    }
  },
  likes: {
    type: Number,
    default: 0,
  },
})

blogSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)