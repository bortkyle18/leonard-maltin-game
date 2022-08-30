// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    categories: [categories]
    friendCount: Int
    friends: [User]
  }

  type Actor {
    _id: ID
    name: String
    image: String
  }

  type Movie {
    _id: ID
    title: String
    year: Int
    image: String
    genres: String
    tagline: String
    imdbRating: Int
    metaCriticRating: Int
    plot: String
    actors: [Actor]
    username: String
  }

  type Category {
    _id: ID
    title: String
    description: String
    username: String
    movieCount: Int
    movies: [Movie]
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    categories (username: String): [Category]
    category(_id: ID!): Category
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    addCategory(title: String!, description: String!, movies: [Movie]!): Category
  }
`;

// export the typeDefs
module.exports = typeDefs;