const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserControllers {
  static async userRegister(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      const saltRounds = +process.env.SALT_ROUNDS;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);

      if (!name || !password || !email || !role) {
        throw {
          status: 400,
          message: "Name, Email, Password, and Role are required",
        };
      }

      const foundUser = await Users.findOne({ where: { email } });

      if (foundUser) {
        throw {
          status: 400,
          message: "User registered",
        };
      }

      let input = {
        name,
        role,
        password: hash,
        email,
      };

      const newUser = await Users.create(input);

      res.status(201).send({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async userLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw { status: 400, message: "Bad Request" };
    }

    const checkUser = await Users.findOne({ where: { email } });

    const checkPassword = bcrypt.compareSync(password, checkUser.password);

    if (!checkPassword || !checkUser) {
      throw { status: 400, message: "Email or Password is wrong!" };
    }

    let userDecode = {
      id: checkUser.id,
      name: checkUser.name,
      email: checkUser.email,
      role: checkUser.role,
    };

    const token = jwt.sign(userDecode, process.env.JWT_SECRET);

    // console.log("Token: ", token);

    res.status(200).send({
      token,
    });
  }
}

module.exports = UserControllers;
