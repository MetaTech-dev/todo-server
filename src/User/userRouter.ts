import express from "express";
import UserController from "./UserController";
import checkPermissions from "../middleware/checkPermissions";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

const { update, getOne, list, updateRole } = new UserController();

router.get(
  "/",
  ClerkExpressRequireAuth(),
  checkPermissions(["read:user"]),
  list
);
router.get("/:userId", ClerkExpressRequireAuth(), getOne);
router.put(
  "/:userId",
  ClerkExpressRequireAuth(),
  checkPermissions(["update:user"]),
  update
);
router.put(
  "/:userId/role",
  ClerkExpressRequireAuth(),
  checkPermissions(["update:userrole"]),
  updateRole
);

export default router;
