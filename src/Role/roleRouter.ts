import express from "express";
import RoleController from "./RoleController";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

const { list } = new RoleController();

// deprecated
router.get("/", ClerkExpressRequireAuth(), list);

export default router;
