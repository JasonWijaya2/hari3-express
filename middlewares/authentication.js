const jwt = require("jsonwebtoken");
const { Users } = require("../models");

async function Authentication(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw { status: 401, message: "Access token is required" };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findOne({ where: { id: decoded.id } });

    if (!user) {
      throw {
        status: 401,
        message: "Unauthorized",
      };
    }

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      next({ status: 401, message: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      next({ status: 401, message: "Token expired" });
    } else {
      next(error);
    }
  }
}

module.exports = Authentication;
