const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '請輸入您的名字'],
  },
  email: {
    type: String,
    required: [true, '請輸入您的 Email'],
    unique: true,
    lowercase: true,
    select: false,
  },
  photo: String,
  // enum 只能是裡面的值
  sex: {
    type: String,
    enum: ['male', 'female'],
  },
  // select 預設是否顯示
  password: {
    type: String,
    required: [true, '請輸入密碼'],
    minlength: 8,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
