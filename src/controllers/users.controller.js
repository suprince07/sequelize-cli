const { User, Todo } = require('../models');
const _ = require('lodash');

const index = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Todo,
          as: "todos"
        }
      ]
    });
    return res.status(200).send(users);
  } catch (e) {
    return res.status(400).send(e.toString());
  }
}

const create = async (req, res) => {
  const body = _.pick(req.body, ['name', 'email', 'password', 'address', 'admin'])
  try {
    const newUser = await User.create(body);
    return res.status(200).send(newUser);
  } catch (e) {
    return res.status(400).send(e.toString());
  }
}

const edit = async (req, res) => {
  const { id } = req.params;
  const body = _.pick(req.body, ['name', 'email', 'password', 'address', 'admin'])
  try {
    const oldUser = await User.findOne({
      where: {
        id
      }
    })
    if (oldUser) {
      oldUser.name = body.name;
      oldUser.email = body.email;
      oldUser.password = body.password;
      oldUser.address = body.address;
      oldUser.admin = body.admin;
      await oldUser.save();
      return res.status(200).send(oldUser);
    } else {
      return res.status(404).send({ message: `No user found with id=${id} found` });
    }
  } catch (e) {
    return res.status(400).send(e.toString());
  }
}

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const oldUser = await User.findOne({
      where: {
        id
      }
    })
    if (oldUser) {
      await oldUser.destroy();
      return res.status(200).send(oldUser);
    } else {
      return res.status(404).send({ message: `No user found with id=${id} found` });
    }
  } catch (e) {
    return res.status(400).send(e.toString());
  }
}

module.exports = {
  index, create, edit, destroy
}