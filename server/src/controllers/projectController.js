import Project from "../models/Project.js";
import path from "path";

// Create Project
export const createProject = async (req, res) => {
    try {
        const { title, description, deadline, status, assignedTo } = req.body;

        if (!title || !deadline) {
            return res.status(400).json({
                success: false,
                message: "Title and deadline are required"
            });
        }

        const project = await Project.create({
            title,
            description,
            deadline,
            status,
            assignedTo,
            createdBy: req.user.userId
        });

        return res.status(201).json({
            success: true,
            data: project
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};

// Get Projects
export const getProjects = async (req, res) => {
    try {
        let projects;
        
        if (req.user.role === "admin") {
            projects = await Project.find().populate("assignedTo", "name email").populate("createdBy", "name email");
        } else {
            projects = await Project.find({ assignedTo: req.user.userId }).populate("assignedTo", "name email").populate("createdBy", "name email");
        }

        return res.status(200).json({
            success: true,
            data: projects
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};

// Get Project by ID
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate("assignedTo", "name email").populate("createdBy", "name email");

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Invalid Project ID or Server Error"
        });
    }
};

// Update Project
export const updateProject = async (req, res) => {
    try {
        const { title, description, deadline, assignedTo, status } = req.body;

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { title, description, deadline, assignedTo, status },
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Invalid Project ID or Server Error"
        });
    }
};

// Delete Project
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Invalid Project ID or Server Error"
        });
    }
};

// Upload PDF
export const uploadProjectPDF = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded or invalid file type"
            });
        }

        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        // Save relative path
        const fileUrl = `/uploads/pdfs/${req.file.filename}`;
        project.documentationPDF = fileUrl;
        await project.save();

        return res.status(200).json({
            success: true,
            message: "PDF uploaded successfully",
            data: project
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};
