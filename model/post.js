const mongoose = require('mongoose');
const postsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user', // 會連接到user connections
    required: [true, '貼文 ID 未填寫'],
  },
  image: {
    type: String,
    default: '',
  },
  createAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  content: {
    type: String,
    required: [true, 'Content 未填寫'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
});

const posts = mongoose.model('posts', postsSchema);

module.exports = posts;
