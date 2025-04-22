function Authorization(requiredRole) {
  return (req, res, next) => {
    try {
      if (!req.user || req.user.role !== requiredRole) {
        throw { status: 403, message: "Forbidden: You do not have access" };
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = Authorization;
