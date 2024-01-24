import express, { Request, Response } from "express";
import ToDoController from "./ToDoController";
import checkPermissions from "../middleware/checkPermissions";
import {
  ClerkExpressRequireAuth,
  RequireAuthProp,
} from "@clerk/clerk-sdk-node";

const router = express.Router();

const { list, create, update, updateAll, remove, getOne } =
  new ToDoController();

router.get(
  "/",
  ClerkExpressRequireAuth(),
  checkPermissions(["read:todo"]),
  list
);
router.post(
  "/",
  ClerkExpressRequireAuth(),
  checkPermissions(["create:todo"]),
  create
);
router.put(
  "/:id",
  ClerkExpressRequireAuth(),
  checkPermissions(["update:todo"]),
  update
);
router.put(
  "/",
  ClerkExpressRequireAuth(),
  checkPermissions(["update:todo"]),
  updateAll
);
router.delete(
  "/",
  ClerkExpressRequireAuth(),
  checkPermissions(["delete:todo"]),
  (_req: RequireAuthProp<Request>, res: Response) => {
    return res.status(400).json({ message: "ID is required" });
  }
);
router.delete(
  "/:id",
  ClerkExpressRequireAuth(),
  checkPermissions(["delete:todo"]),
  remove
);
router.get(
  "/:id",
  ClerkExpressRequireAuth(),
  checkPermissions(["read:todo"]),
  getOne
);

export default router;
