import Meeting from "../models/Meeting.js";

export const createMeeting = async (req, res) => {
try {
const roomId =
"MX-" +
Math.random().toString(36).substring(2, 8).toUpperCase();
const meeting = await Meeting.create({
  roomId,
  createdBy: req.user.id,
});

res.status(201).json({
  success: true,
  meeting,
});

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

export const getMyMeetings = async (req, res) => {
try {
const meetings = await Meeting.find({
createdBy: req.user.id,
}).sort({ createdAt: -1 });

res.status(200).json({
  success: true,
  meetings,
});

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};
