import express from "express";
import { registerUser, loginUser, getUserProfile, getAllUsers, refreshUserToken, logoutUser, updateUserProfile } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/users", protect, adminOnly, getAllUsers);
router.post("/refresh", refreshUserToken);
router.post("/logout", logoutUser);

export default router;