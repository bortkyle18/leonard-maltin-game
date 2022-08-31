const { Schema, model } = require('mongoose');
const User = require('./User')


const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 280
    },
    description: {
      type: String,
      required: true,
      maxlength: 280
    },
    userId: {
      type: String,
      required: true
    },
    movies:  {
      type: Array,
      required: true
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);

categorySchema.virtual('movieCount').get(function() {
  return this.movies.length;
});


const Category = model('Category', categorySchema);

module.exports = Category;