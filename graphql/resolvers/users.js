import { UserInputError, ApolloError } from 'apollo-server-express';
import bcryptjs from 'bcryptjs';
import User from '../../models/User.js';
import { auth } from '../../utils/auth.js';

export const users = {
  Mutation: {
    // Register USER
    // Access: Public
    registerUser: async (
      _,
      { registerInput: { username, email, password, confirmedPassword } }
    ) => {
      if (!username || !email || !password || !confirmedPassword) {
        throw new UserInputError('Fields cannot be empty!');
      }
      const existUser = await User.findOne({ username });
      if (existUser) {
        throw new UserInputError('User is already exist');
      }
      const newUser = new User({
        email,
        username,
        password,
      });

      const result = await newUser.save();

      return {
        ...result._doc,
        id: result._id,
        token: result.createJWT(),
      };
    },
    // Login USER
    // Access: Public
    loginUser: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError('User not found');
      }
      const match = await bcryptjs.compare(password, user.password);
      if (!match) {
        throw new UserInputError('Wrong crendetials');
      }
      return {
        ...user._doc,
        id: user._id,
        token: user.createJWT(),
      };
    },
    // Update USER
    // Access: Private
    updateUser: async (
      _,
      { updateUserInput: { username, email, password } },
      context
    ) => {
      const userValidate = auth(context);
      const user = await User.findOne({ _id: userValidate.id });
      if (user) {
        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password || user.password;
      }

      await user.save();
      console.log(user._doc);
      return {
        ...user._doc,
        token: user.createJWT(),
        id: user._id,
      };
    },
  },
};
