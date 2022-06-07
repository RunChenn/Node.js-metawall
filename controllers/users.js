const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const validator = require('validator');

// bcrypt.hash('12222', 12).then((res) => {
//   bcrypt.compare('12222', res, function (err, ans) {
//     console.log(ans);
//   });
//   console.log(res);
// });

// console.log(validator.isLength('12222', { min: 8 }));

const users = {
  getUsers: handleErrorAsync(async (req, res) => {
    const user = await User.find();
    handleSuccess(res, user);
  }),
  getProfile: handleErrorAsync(async (req, res) => {
    const user = await User.find();
    handleSuccess(res, user);
  }),
  // 註冊
  sign_up: handleErrorAsync(async (req, res, next) => {
    let { email, password, confirmPassword, name } = req.body;
    // 內容不可為空
    if (!email || !password || !confirmPassword || !name) {
      return next(appError('400', '欄位未填寫正確！', next));
    }
    // 密碼正確
    if (password !== confirmPassword) {
      return next(appError('400', '密碼不一致！', next));
    }
    // 密碼 8 碼以上
    if (!validator.isLength(password, { min: 8 })) {
      return next(appError('400', '密碼字數低於 8 碼', next));
    }
    // 是否為 Email
    if (!validator.isEmail(email)) {
      return next(appError('400', 'Email 格式不正確', next));
    }

    // 加密密碼
    password = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
      email,
      password,
      name,
    });
    generateSendJWT(newUser, 201, res);
  }),
  // 登入
  sign_in: handleErrorAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(appError(400, '帳號密碼不可為空', next));
    }

    if (!validator.isEmail(email)) {
      return next(appError(400, 'Email 格式不正確', next));
    }

    const user = await User.findOne({ email }).select('+password');
    const auth = await bcrypt.compare(password, user.password);

    if (!user) {
      return next(appError(400, '您的帳號或密碼不正確', next));
    }

    if (!auth) {
      return next(appError(400, '您的帳號或密碼不正確', next));
    }
    generateSendJWT(user, 200, res);
  }),
  // 重設密碼
  updatePassword: handleErrorAsync(async (req, res, next) => {
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return next(appError(400, '密碼不可為空', next));
    }

    if (password !== confirmPassword) {
      return next(appError(400, '密碼不一致', next));
    }

    if (!validator.isLength(password, { min: 8 })) {
      return next(appError(400, '密碼字數至少要 8 碼', next));
    }

    if (validator.isNumeric(password) || validator.isAlpha(password)) {
      return next(appError(400, '密碼需英數混合', next));
    }

    const newPassword = await bcrypt.hash(password, 12);

    const user = await User.findByIdAndUpdate(req.user._id, {
        password: newPassword,
    });

    generateSendJWT(user, 200, res);
  }),
};

module.exports = users;
