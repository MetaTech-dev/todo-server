import express from "express";
import StatusController from "./statusController";
import checkAuth from "../middleware/checkAuth";

const router = express.Router();

const { list, create, update, updateAll, remove, getOne } =
  new StatusController();

router.get("/", checkAuth, list);
router.post("/", checkAuth, create);
router.put("/:id", checkAuth, update);
router.put("/", checkAuth, updateAll);
router.delete("/", checkAuth, (_req, res) => {
  return res.status(400).json({ message: "ID is required" });
});
router.delete("/:id", checkAuth, remove);
router.get("/:id", checkAuth, getOne);

export default router;
