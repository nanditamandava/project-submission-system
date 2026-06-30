import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: String,

    documentationPDF: String,

    deadline: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["Pending", "Submitted", "Completed"],
        default: "Pending"
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps: true
});

export default mongoose.model("Project", projectSchema);