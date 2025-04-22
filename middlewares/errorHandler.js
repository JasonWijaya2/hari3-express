function errorHandler(err, req, res, next) {
  const statusCode = err.status || 500;
  const message = err.message || "Invalid server error";

  res.status(statusCode).json(message);
}

module.exports = errorHandler;
