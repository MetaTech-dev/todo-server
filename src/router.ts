import express from "express";
import toDoRouter from "./ToDo/toDoRouter";
import statusRouter from "./Status/statusRouter";

const router = express.Router();

router.use("/todo", toDoRouter);
router.use("/status", statusRouter);
export default router;
