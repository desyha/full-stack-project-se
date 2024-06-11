import express from "express"
import { shouldBeOwner, shouldBeUser } from "../controller/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/should-be-user", verifyToken, shouldBeUser )
router.get("/should-be-owner", verifyToken, shouldBeOwner)

export default router