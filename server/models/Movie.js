const { Schema } = require('mongoose');
const Actor = require('./Actor');


const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 280
    },
    year: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true
    },
    genre: {
      type: String
    },
    tagline: {
      type: String
    },
    imdbRating: {
      type: Number
    },
    metaCriticRating: {
      type: Number
    },
    plot: {
      type: String,
      required: true
    },
    year: [Actor],
    username: {
      type: String
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);


const Movie = model('Movie', movieSchema);

module.exports = Movie;
