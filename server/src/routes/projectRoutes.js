import express from "express";
import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    uploadProjectPDF,
    deleteProjectPDF
} from "../controllers/projectController.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import { uploadPDF } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);
router.put("/:id", protect, adminOnly, updateProject);
router.delete("/:id", protect, adminOnly, deleteProject);

// Upload PDF endpoint
router.post("/:id/upload-pdf", protect, adminOnly, uploadPDF.single("pdf"), uploadProjectPDF);
router.delete("/:id/documentation", protect, adminOnly, deleteProjectPDF);

export default router;
