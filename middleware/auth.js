const jwt = require('jsonwebtoken');
const User = require('../model/user');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');

const isAuth = handleErrorAsync(async (req, res, next) => {
  // 確認 token 是否存在
  let token;

  // 檢查 headers 有沒有傳 token 跟是否是 JWT 格式
  if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(appError(401,'你尚未登入！',next));
  }

  // 驗證 token 正確性
  const decoded = await jwt.verify(token,process.env.JWT_SECRET,(err,payload) =>{

    if (err) {
      next(appError(401,'token 錯誤',next));
    } else {
      return payload;
    }

  });

  const currentUser = await User.findById(decoded.id);

  req.user = currentUser;
  next();
});

const generateSendJWT= (user,statusCode,res)=>{
  // 產生 JWT token
  const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES_DAY
  });
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    user:{
      token,
      name: user.name
    }
  });
}


module.exports = {
  generateSendJWT,
  isAuth,
}