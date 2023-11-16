import express from "express";
import ToDoController from "./ToDoController";

const router = express.Router();

const { list, create, update, remove, getOne } = new ToDoController();

router.get("/", list);
router.post("/", create);
router.put("/:id", update);
router.delete("/", (_req, res) => {
  return res.status(400).json({ message: "ID is required" });
});
router.delete("/:id", remove);
router.get("/:id", getOne);

export default router;
