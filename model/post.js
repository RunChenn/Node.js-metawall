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
  likes: [
    { 
      type: mongoose.Schema.ObjectId, 
      ref: 'User' 
    }
  ],
  comments: {
    type: Number,
    default: 0,
  },
},
{
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

postsSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id'
});

const posts = mongoose.model('posts', postsSchema);

module.exports = posts;
