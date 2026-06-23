import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Dashboard",
    user: req.user,
  });
});

export default router;