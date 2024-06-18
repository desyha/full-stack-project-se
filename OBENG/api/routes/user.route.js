import express from "express";

import { deleteUser, getUser, profileBengkel, saveBengkel, updateUser } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/search/:id", getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/save", verifyToken, saveBengkel);
router.get("/profileBengkel", verifyToken, profileBengkel);

export default router;