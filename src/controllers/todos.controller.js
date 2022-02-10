const { User,Todo } = require('../models');
const _ = require('lodash');

const index = async (req, res) => {
  try {
    const users = await Todo.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes:['id', 'name']
        }
      ]
    });
    return res.status(200).send(users);
  } catch (e) {
    return res.status(400).send(e.toString());
  }
}

const create = async (req, res) => {
  const body = _.pick(req.body, ['title', 'description', 'completed', 'userId'])
  try {
    const newTodo = await Todo.create(body);
    return res.status(200).send(newTodo);
  } catch (e) {
    return res.status(400).send(e.toString());
  }
}

const edit = async (req, res) => {

}

const destroy = async (req, res) => {
}

module.exports = {
  index, create, edit, destroy
}