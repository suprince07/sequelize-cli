const { User } = require('../models')
const _ = require('lodash');
const { hashPassword, comparePassword } = require('../utils/bcrypt.util')
const { generateToken } = require('../utils/jwt.util')

const login = async (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  try {
    const oldUser = await User.findOne({
      where: {
        email:body.email
      }
    });
    if (oldUser) {
      if (comparePassword(body.password, oldUser.password)) {
        const payload = { id: oldUser.id, email: oldUser.email }
        const token = generateToken(payload);
        return res.status(200).send({ token })
      } else {
        return res.status(400).send({ message: "Invalid Credentials" })
      }
    } else {
      return res.status(400).send({ message: "Invalid Credentials" })
    }
  } catch (e) {
    return res.status(400).send({ message: e.toString() })
  }
}

const signup = async (req, res) => {
  const body = _.pick(req.body, ['name', 'email', 'password', 'address', 'admin']);
  try {
    const oldUser = await User.findOne({
      where: {
        email:body.email
      }
    });
    if (!oldUser) {
      body.password = hashPassword(body.password);
      await User.create(body);
      return res.status(200).send({ message: "Registration successful." })
    } else {
      return res.status(400).send({ message: "Email already exists" })
    }
  } catch (e) {
    return res.status(400).send({ message: e.toString() })
  }
}

module.exports = {
  login, signup
}