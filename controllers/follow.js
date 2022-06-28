const handleSuccess = require('../service/handleSuccess');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const Follow = require('../model/follow');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { generateSendJWT } = require('../middleware/auth');

const follow = {
  getFollow: handleErrorAsync(async (req, res, next) => {
    const { id } = req.params
    const follow = await Follow.findOne({ userId: id })
      .populate({
        path: 'following',
        populate: { path: 'user' },
      })
      .populate({
        path: 'follower',
        populate: { path: 'user' },
      })
    successHandle(res, follow)
  }),
  updateFollow: handleErrorAsync(async (req, res, next) => {

    if (req.params.id === req.user.id) {
      return next(appError(401,'您無法追蹤自己',next));
    }
    await User.updateOne(
      {
        _id: req.user.id,
        'following.user': { $ne: req.params.id }
      },
      {
        $addToSet: { following: { user: req.params.id } }
      }
    );
    await User.updateOne(
      {
        _id: req.params.id,
        'followers.user': { $ne: req.user.id }
      },
      {
        $addToSet: { followers: { user: req.user.id } }
      }
    );

    successHandle(res, follow)

    // res.status(200).json({
    //   status: 'success',
    //   message: '您已成功追蹤！'
    // });

  }),
  deleteFollow: handleErrorAsync(async (req, res, next) => {
    if (req.params.id === req.user.id) {
      return next(appError(401,'您無法取消追蹤自己',next));
    }
    await User.updateOne(
      {
        _id: req.user.id
      },
      {
        $pull: { following: { user: req.params.id } }
      }
    );
    await User.updateOne(
      {
        _id: req.params.id
      },
      {
        $pull: { followers: { user: req.user.id } }
      }
    );
    // res.status(200).json({
    //   status: 'success',
    //   message: '您已成功取消追蹤！'
    // });
    successHandle(res, follow)
  }),
};

module.exports = follow;
