import express from "express";
import StatusController from "./statusController";
import checkAuth from "../middleware/checkAuth";
import checkPermissions from "../middleware/checkPermissions";

const router = express.Router();

const { list, create, update, updateAll, remove, getOne } =
  new StatusController();

router.get("/", checkAuth, checkPermissions(["read:status"]), list);
router.post("/", checkAuth, checkPermissions(["create:status"]), create);
router.put("/:id", checkAuth, checkPermissions(["update:status"]), update);
router.put("/", checkAuth, checkPermissions(["update:status"]), updateAll);
router.delete(
  "/",
  checkAuth,
  checkPermissions(["delete:status"]),
  (_req, res) => {
    return res.status(400).json({ message: "ID is required" });
  }
);
router.delete("/:id", checkAuth, checkPermissions(["delete:status"]), remove);
router.get("/:id", checkAuth, checkPermissions(["read:status"]), getOne);

export default router;
