import express from "express";
import { submitProject, getSubmissionsByProject, getAllSubmissions } from "../controllers/submissionController.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import { uploadZIP } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Upload ZIP endpoint
router.post("/", protect, uploadZIP.single("zip"), submitProject);

// Get submissions for a project
router.get("/project/:projectId", protect, getSubmissionsByProject);

// Get all submissions (Admin Only)
router.get("/", protect, adminOnly, getAllSubmissions);

export default router;
