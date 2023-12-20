import express from "express";
import toDoRouter from "./ToDo/toDoRouter";
import statusRouter from "./Status/statusRouter";
import userRouter from "./User/userRouter";

const router = express.Router();

router.use("/todo", toDoRouter);
router.use("/status", statusRouter);
router.use("/user", userRouter);
export default router;
