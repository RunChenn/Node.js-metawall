var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const appError = require('./service/appError');

// router
var postsRouter = require('./routes/posts');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload');

var app = express();

// 程式出現重大錯誤時
process.on('uncaughtException', (err) => {
  // 記錄錯誤下來，等到服務都處理完後，停掉該 process
  console.error('Uncaughted Exception！');
  console.error(err);
  process.exit(1);
});

require('./connections');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(appError(400, '無此路由', next));
});

//prod env error
const resErrorProd = (error, res) => {
  const { isOperational, statusCode, message } = error;
  if (isOperational) {
    res.status(statusCode).json({
      message,
    });
    return;
  }
  console.error('server Error!!!', error);
  //罐頭訊息
  res.status(500).json({
    status: 'error',
    message: '伺服器忙線中，請稍後再試',
  });
};

// dev env error
const resErrorDev = (error, res) => {
  const { stack, message } = error;
  res.status(500).json({
    status: 'error',
    message: {
      message,
      error,
      stack,
    },
  });
};

// error handler
app.use(function (err, req, res, next) {
  // dev
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'dev') {
    return resErrorDev(err, res);
  }
  // production
  if (err.name === 'ValidationError') {
    err.message = '資料欄位未填寫正確，請重新輸入！';
    err.isOperational = true;
    return resErrorProd(err, res);
  }

  if (err.name === 'CastError') {
    err.message = '無此 id 資料，請確認後重新輸入！';
    err.isOperational = true;
    return resErrorProd(err, res);
  }

  resErrorProd(err, res);
});

// 未捕捉到的 catch
process.on('unhandledRejection', (err, promise) => {
  console.error('未捕捉到的 rejection：', promise, '原因：', err);
});

module.exports = app;
