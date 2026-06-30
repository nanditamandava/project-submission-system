import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    zipFile: {
        type: String,
        required: true
    },

    submittedAt: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true
});

export default mongoose.model("Submission", submissionSchema);