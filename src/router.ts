import express from 'express';
import toDoRouter from './ToDo/toDoRouter';

const router = express.Router();

router.use('/todo', toDoRouter);

export default router;