import express from "express";
import RoleController from "./RoleController";
import checkAuth from "../middleware/checkAuth";

const router = express.Router();

const { list } = new RoleController();

router.get("/", checkAuth, list);

export default router;
