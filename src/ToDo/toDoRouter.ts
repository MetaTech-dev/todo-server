import express from "express";
import ToDoController from "./ToDoController";
import checkAuth from "../middleware/checkAuth";
import checkPermissions from "../middleware/checkPermissions";

const router = express.Router();

const { list, create, update, updateAll, remove, getOne } =
  new ToDoController();

router.get("/", checkAuth, checkPermissions(["read:toDo"]), list);
router.post("/", checkAuth, checkPermissions(["create:toDo"]), create);
router.put("/:id", checkAuth, checkPermissions(["update:toDo"]), update);
router.put("/", checkAuth, checkPermissions(["update:toDo"]), updateAll);
router.delete(
  "/",
  checkAuth,
  checkPermissions(["delete:toDo"]),
  (_req, res) => {
    return res.status(400).json({ message: "ID is required" });
  }
);
router.delete("/:id", checkAuth, checkPermissions(["delete:toDo"]), remove);
router.get("/:id", checkAuth, checkPermissions(["read:toDo"]), getOne);

export default router;
