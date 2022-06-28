const mongoose = require('mongoose');
const followSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User ID 未填寫'],
  },
  followers: [
    {
      user: { type: mongoose.Schema.ObjectId, ref: 'User' },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  following: [
    {
      user: { type: mongoose.Schema.ObjectId, ref: 'User' },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
},
{ versionKey: false }
);

const follow = mongoose.model('follow', followSchema);

module.exports = follow;
