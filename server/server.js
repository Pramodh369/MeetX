import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/meeting", meetingRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("MeetX API Running");
});

/* Socket.io */

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    socket.roomId = roomId;

    const roomSize = io.sockets.adapter.rooms.get(roomId)?.size || 0;

    console.log(`Socket ${socket.id} joined room ${roomId}`);

    io.to(roomId).emit("participant-count", roomSize);

    socket.to(roomId).emit("receive-message", {
      message: "🟢 A participant joined the meeting",
      system: true,
    });

    if (roomSize === 2) {
      io.to(roomId).emit("ready");
    }
  });

  socket.on("send-message", ({ roomId, message }) => {
    io.to(roomId).emit("receive-message", {
      message,
      socketId: socket.id,
    });
  });
  socket.on("offer", (data) => {
    console.log("SERVER RECEIVED OFFER");
    socket.to(data.roomId).emit("offer", data);
  });

  socket.on("answer", (data) => {
    console.log("SERVER RECEIVED ANSWER");
    socket.to(data.roomId).emit("answer", data);
  });

  socket.on("ice-candidate", (data) => {
    socket.to(data.roomId).emit("ice-candidate", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);

    if (socket.roomId) {
      socket.to(socket.roomId).emit("receive-message", {
        message: "🔴 A participant left the meeting",
        system: true,
      });

      setTimeout(() => {
        io.to(socket.roomId).emit(
          "participant-count",
          io.sockets.adapter.rooms.get(socket.roomId)?.size || 0,
        );
      }, 100);
    }
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
