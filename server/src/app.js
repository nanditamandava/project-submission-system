import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false })); // allows serving static files cross-origin if needed
app.use(morgan("dev"));

// Static Folder for Uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Test Route
app.get("/", (req, res) => {
    res.send("Project Submission API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/submissions", submissionRoutes);

export default app;