import express from "express";
import RoleController from "./RoleController";

const router = express.Router();

const { list } = new RoleController();

router.get("/", list);

export default router;
