const { Schema, model } = require('mongoose');
const movieSchema = require('./Movie');


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
    username: {
      type: String,
      required: true
    },
    movies:  [movieSchema]
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