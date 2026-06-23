import express from "express";
import {
createMeeting,
getMyMeetings,
} from "../controllers/meetingController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createMeeting);

router.get(
"/my-meetings",
protect,
getMyMeetings
);

export default router;
