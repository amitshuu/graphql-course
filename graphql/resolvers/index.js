import { posts } from './posts.js';
import { users } from './users.js';

export default {
  Query: {
    ...posts.Query,
  },
  Mutation: {
    ...users.Mutation,
  },
};
