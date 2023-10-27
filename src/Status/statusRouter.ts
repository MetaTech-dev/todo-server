import express from "express";
import StatusController from "./statusController";

const router = express.Router();

const { list, create, update, remove, getOne } = new StatusController();

router.get("/", list);
router.post("/", create);
router.put("/", update);
router.delete("/:id", remove);
router.get("/:id", getOne);

export default router;
