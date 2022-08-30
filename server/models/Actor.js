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


const Actor = model('Actor', actorSchema);

module.exports = Actor;