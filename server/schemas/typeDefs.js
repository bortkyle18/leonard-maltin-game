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
    categories: [Category]
    friendCount: Int
    friends: [User]
  }

  type Actor {
    actorId: ID
    name: String
    image: String
  }

  type Movie {
    movieId: ID
    title: String
    year: Int
    image: String
    genre: String
    tagline: String
    imdbRating: Int
    metaCriticRating: Int
    plot: String
    actors: [Actor]
    username: String
  }

  type Category {
    categoryId: ID
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
    category(categoryId: ID!): Category
    movies (username: String): [Movie]
    movie(movieId: ID!): Movie
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    addCategory(categoryId: ID!, title: String!, description: String!, username: String, movieCount: Int, movies: [ID]!): Category
    addMovie(movieId: ID!, title: String!, year: Int!, image: String!, genre: String, tagline: String, imdbRating: Int, metaCriticRating: Int, plot: String!, actors: [ID]!, username: String): Movie
    addActor(actorId: ID!, name: String!, image: String): Actor
    removeFriend(FriendId: ID!): User
    removeCategory(categoryId: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;