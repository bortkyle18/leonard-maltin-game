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
    actorId: ID
    name: String
    image: String
  }

  input ActorInput {
    actorId: ID!
    name: String!
    image: String
  }

  type Movie {
    movieId: ID
    title: String!
    year: Int!
    image: String!
    genre: String
    tagline: String
    imdbRating: Int
    metaCriticRating: Int
    plot: String!
    actors: [Actor]!
    username: String
  }

  input MovieInput {
    movieId: ID!
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

  input CategoryInput {
    categoryId: ID!
    title: String!
    description: String!
    username: String
    movieCount: Int
    movies: [Movie]!
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    categories (username: String): [Category]
    category(categoryId: ID!): Category
    movies (username: String): [movie]
    movie(movieId: ID!): movie
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    addCategory(categoryData: CategoryInput!): Category
    addMovie(categoryId: ID!, movieData: MovieInput!): Movie
    addActor(movieId: ID!, actorData: ActorInput!): Actor
    removeFriend(FriendId: ID!): User
    removeCategory(categoryId: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;