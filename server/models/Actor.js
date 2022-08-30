const { Schema } = require('mongoose');


const actorSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = actorSchema;