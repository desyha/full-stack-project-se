import express from "express"
import { verifyToken } from "../middleware/verifyToken.js";
import { addBengkel, getAllBengkel, getBengkel,  reviewBengkel } from "../controller/bengkel.controller.js";
const router = express.Router();

router.get("/", getAllBengkel)
router.get("/:id", getBengkel)
router.post("/", verifyToken, addBengkel)
router.post("/:id", verifyToken, reviewBengkel)

export default router