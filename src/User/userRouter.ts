import express from "express";
import UserController from "./UserController";

// import checkAuth from "../middleware/checkAuth";
// import checkPermissions from "../middleware/checkPermissions";

const router = express.Router();

const { update, getOne, list, assignRoles } = new UserController();

router.get("/", list);
router.get("/:id", getOne);
router.put("/:id", update);
router.put("/:id/role", assignRoles);

export default router;
