const router=require('express').Router();
const UserController=require('../controllers/users.controller')
const TodoController=require('../controllers/todos.controller')

router.get('/users',UserController.index);
router.post('/users',UserController.create);
router.put('/users',UserController.edit);
router.delete('/users',UserController.destroy);

router.get('/todos',TodoController.index);
router.post('/todos',TodoController.create);
router.put('/todos',TodoController.edit);
router.delete('/todos',TodoController.destroy);

module.exports=router;