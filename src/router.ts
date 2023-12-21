import express from "express";
import toDoRouter from "./ToDo/toDoRouter";
import statusRouter from "./Status/statusRouter";
import userRouter from "./User/userRouter";
import roleRouter from "./Role/roleRouter";

const router = express.Router();

router.use("/todo", toDoRouter);
router.use("/status", statusRouter);
router.use("/user", userRouter);
router.use("/role", roleRouter);
export default router;
