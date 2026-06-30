import express from "express";
import { submitProject } from "../controllers/submissionController.js";
import protect from "../middleware/authMiddleware.js";
import { uploadZIP } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Upload ZIP endpoint
router.post("/", protect, uploadZIP.single("zip"), submitProject);

export default router;
