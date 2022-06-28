const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'comment can not be empty!']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    // 如果有用到find語法
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      require: ['true', 'user must belong to a post.']
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'post',
      require: ['true', 'comment must belong to a post.']
    }
  }
);
// 如果有用到find語法，就會觸發以下程式碼。引用 user 裡面的 name id createdAt 資料
commentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name id createdAt'
  });

  next();
});
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;