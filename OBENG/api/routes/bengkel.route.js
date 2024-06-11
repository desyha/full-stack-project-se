import express from "express"
import { verifyToken } from "../middleware/verifyToken.js";
import { addBengkel, deleteBengkel, getAllBengkel, getBengkel, updateBengkel, reviewBengkel } from "../controller/bengkel.controller.js";
const router = express.Router();

router.get("/", getAllBengkel)
router.get("/:id", getBengkel)
router.post("/", verifyToken, addBengkel)
router.put("/:id", verifyToken, updateBengkel)
router.delete("/:id", verifyToken, deleteBengkel)
router.post("/:id", verifyToken, reviewBengkel)
export default router