import Post from '../../models/Post.js';
export const posts = {
  Query: {
    getPosts: async () => {
      try {
        const post = await Post.find();
        return post;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
