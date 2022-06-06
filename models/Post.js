import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
    },
    // { timestamps: true },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
});

export default mongoose.model('Post', postSchema);
