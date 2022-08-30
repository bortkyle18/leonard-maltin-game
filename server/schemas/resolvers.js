const { AuthenticationError } = require('apollo-server-express');
const { Category, Movie, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('friends')
          .populate('categories');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('categories');
    },
    user: async (parent, { email }) => {
      return User.findOne({ email })
        .select('-__v -password')
        .populate('friends')
        .populate('categories');
    },
    categories: async (parent, { email }) => {
      const params = email ? { email } : {};
      return Category.find(params).sort();
    },
    category: async (parent, { _id }) => {
      return Category.findOne({ _id });
    }
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },



    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },



    addCategory: async (parent, { categoryData }, context) => {
      if (context.user) {
        const category = await Category.create({ ...categoryData, email: context.user.email });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { categories: { ...categoryData, email: context.user.email } } },
          { new: true }
        );

        return category;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addMovie: async (parent, { categoryId, movieData }, context) => {
      if (context.user) {
        const updatedCategory = await Category.findOneAndUpdate(
          { _id: categoryId },
          { $push: { movies: { ...movieData, email: context.user.email } } },
          { new: true, runValidators: true }
        );

        return updatedCategory;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addActor: async (parent, { movieId, actorData }, context) => {
      if (context.user) {
        const updatedMovie = await Movie.findOneAndUpdate(
          { _id: movieId },
          { $push: { actors: { ...actorData, email: context.user.email } } },
          { new: true, runValidators: true }
        );

        return updatedMovie;
      }

      throw new AuthenticationError('You need to be logged in!');
    },



    removeFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: { friendId } } },
          { new: true }
        );
        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    removeCategory: async (parent, { categoryId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { categories: { categoryId } } },
          { new: true }
        );
        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
