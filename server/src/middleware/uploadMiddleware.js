import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure directories exist
const pdfDir = path.join(__dirname, "../../uploads/pdfs");
const zipDir = path.join(__dirname, "../../uploads/zips");

if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
}
if (!fs.existsSync(zipDir)) {
    fs.mkdirSync(zipDir, { recursive: true });
}

// PDF Storage Engine
const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pdfDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, "project-" + uniqueSuffix + path.extname(file.originalname));
    }
});

// ZIP Storage Engine
const zipStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, zipDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, "submission-" + uniqueSuffix + path.extname(file.originalname));
    }
});

// File Filters
const pdfFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf" && path.extname(file.originalname).toLowerCase() === ".pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed!"), false);
    }
};

const zipFilter = (req, file, cb) => {
    const allowedMimeTypes = ["application/zip", "application/x-zip-compressed", "multipart/x-zip"];
    if (allowedMimeTypes.includes(file.mimetype) && path.extname(file.originalname).toLowerCase() === ".zip") {
        cb(null, true);
    } else {
        cb(new Error("Only ZIP files are allowed!"), false);
    }
};

export const uploadPDF = multer({
    storage: pdfStorage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: pdfFilter
});

export const uploadZIP = multer({
    storage: zipStorage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    fileFilter: zipFilter
});
