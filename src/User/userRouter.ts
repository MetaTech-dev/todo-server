import express from "express";
import UserController from "./UserController";

import checkAuth from "../middleware/checkAuth";
import checkPermissions from "../middleware/checkPermissions";

const router = express.Router();

const { update, getOne, list, updateRoles } = new UserController();

router.get("/", checkAuth, checkPermissions(["read:user"]), list);
router.get("/:id", checkAuth, checkPermissions(["read:user"]), getOne);
router.put("/:id", checkAuth, checkPermissions(["update:user"]), update);
router.put("/:id/role", checkAuth, checkPermissions(["update:user-role"]), updateRoles);

export default router;


