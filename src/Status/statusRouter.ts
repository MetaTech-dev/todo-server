import express, { Request, Response } from "express";
import StatusController from "./StatusController";
import checkPermissions from "../middleware/checkPermissions";
import {
  ClerkExpressRequireAuth,
  RequireAuthProp,
} from "@clerk/clerk-sdk-node";

const router = express.Router();

const { list, create, update, updateAll, remove, getOne } =
  new StatusController();

router.get(
  "/",
  ClerkExpressRequireAuth(),
  checkPermissions(["read:status"]),
  list
);
router.post(
  "/",
  ClerkExpressRequireAuth(),
  checkPermissions(["create:status"]),
  create
);
router.put(
  "/:id",
  ClerkExpressRequireAuth(),
  checkPermissions(["update:status"]),
  update
);
router.put(
  "/",
  ClerkExpressRequireAuth(),
  checkPermissions(["update:status"]),
  updateAll
);
router.delete(
  "/",
  ClerkExpressRequireAuth(),
  checkPermissions(["delete:status"]),
  (_req: RequireAuthProp<Request>, res: Response) => {
    return res.status(400).json({ message: "ID is required" });
  }
);
router.delete(
  "/:id",
  ClerkExpressRequireAuth(),
  checkPermissions(["delete:status"]),
  remove
);
router.get(
  "/:id",
  ClerkExpressRequireAuth(),
  checkPermissions(["read:status"]),
  getOne
);

export default router;
