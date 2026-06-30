import Submission from "../models/Submission.js";
import Project from "../models/Project.js";

// Submit Project (Upload ZIP)
export const submitProject = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded or invalid file type"
            });
        }

        const { projectId } = req.body;

        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "projectId is required"
            });
        }

        // Validate that the project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        // Save relative path
        const fileUrl = `/uploads/zips/${req.file.filename}`;

        const submission = await Submission.create({
            projectId,
            userId: req.user.userId,
            zipFile: fileUrl
        });

        // Optionally update the project status here
        project.status = "Submitted";
        await project.save();

        return res.status(201).json({
            success: true,
            message: "Project submitted successfully",
            data: submission
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};

// Get Submissions by Project
export const getSubmissionsByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        
        const submissions = await Submission.find({ projectId }).populate('userId', 'name email');
        
        return res.status(200).json({
            success: true,
            data: submissions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};

// Get All Submissions (Admin Only)
export const getAllSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find().populate('userId', 'name email').populate('projectId', 'title');
        
        return res.status(200).json({
            success: true,
            data: submissions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};
