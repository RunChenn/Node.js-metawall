const appError = (status, errMessage, next) => {
  console.log(errMessage);
  const err = new Error(errMessage);
  err.statusCode = status;
  err.isOperational = true;
  next(err);
};

module.exports = appError;
