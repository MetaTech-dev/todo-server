import express from 'express';
import ToDoController from './ToDoController';

const router = express.Router();

const { list, create, update, remove, getOne } = new ToDoController();

router.get('/', list);
router.post('/', create);
router.put('/', update);
router.delete('/:id', remove);
router.get('/:id', getOne)

export default router;