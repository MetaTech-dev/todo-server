import express from "express";
import UserController from "./userController";
import checkAuth from "../middleware/checkAuth";
import checkPermissions from "../middleware/checkPermissions";

const router = express.Router();

const { update, getOne, list, assignRoles } = new UserController();

router.get(
  "/",
  // checkAuth, checkPermissions(["read:user"]),
  list
);
router.get("/:id", getOne);
router.put("/:id", update);
router.put("/:id/assign-roles", assignRoles);
