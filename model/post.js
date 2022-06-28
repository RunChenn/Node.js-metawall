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
  // comments: {
  //   type: Number,
  //   default: 0,
  // },
},
{
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});
// virtuals(虛擬)，comment偷掛上去
postsSchema.virtual('comments', {
  ref: 'Comment', // 拉的 model
  foreignField: 'post', // model 裡面的 post
  localField: '_id' // 找尋一樣的 id
});

const posts = mongoose.model('posts', postsSchema);

module.exports = posts;
