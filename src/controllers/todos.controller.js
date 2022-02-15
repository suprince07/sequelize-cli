const { User,Todo } = require('../models');
const _ = require('lodash');

const index = async (req, res) => {
  try {
    const {id}=req.user;
    const users = await Todo.findAll({
      where:{
        userId:id
      },
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
  const {id}=req.user;
  const body = _.pick(req.body, ['title', 'description', 'completed'])
  body['userId']=id;
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
  const {id}=req.params;
  const userId=req.user.id;
  try {
    const newTodo = await Todo.findOne({
      where:{
        id
      }
    });
    if(newTodo){
      if(newTodo.userId===userId){
        await newTodo.destroy();
        return res.status(200).send({message:"Todo deleted"});
      }else{
        return res.status(403).send({message:"You are not authorized to perform this task"});
      }
    }else{
      return res.status(404).send({message:"No todo found"});
    }
  } catch (e) {
    return res.status(400).send(e.toString());
  }
}

module.exports = {
  index, create, edit, destroy
}