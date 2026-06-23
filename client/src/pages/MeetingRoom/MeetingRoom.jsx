import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function MeetingRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [participants, setParticipants] = useState(0);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  const remoteVideoRef = useRef(null);
  const videoRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("participant-count", (count) => {
      setParticipants(count);
    });

    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("participant-count");
      socket.off("receive-message");
    };
  }, [roomId]);

  useEffect(() => {
    const getCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localStreamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.log(error);
        alert("Camera permission denied");
      }
    };

    getCamera();
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send-message", {
      roomId,
      message,
    });

    setMessage("");
  };

  const toggleMute = () => {
    const audioTrack =
      localStreamRef.current?.getAudioTracks()[0];

    if (!audioTrack) return;

    audioTrack.enabled = !audioTrack.enabled;

    setIsMuted(!audioTrack.enabled);
  };

  const toggleCamera = () => {
    const videoTrack =
      localStreamRef.current?.getVideoTracks()[0];

    if (!videoTrack) return;

    videoTrack.enabled = !videoTrack.enabled;

    setIsCameraOff(!videoTrack.enabled);
  };

  const leaveMeeting = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-4xl font-bold">
            Meeting Room
          </h1>

          <p className="mt-3 text-slate-400">
            Room ID: {roomId}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8">

            <div className="grid h-[450px] gap-4 md:grid-cols-2">

              <div className="overflow-hidden rounded-2xl bg-slate-800">
                <h3 className="mb-2 text-center font-semibold">
                  You
                </h3>

                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="h-full w-full object-cover -scale-x-100"
                />
              </div>

              <div className="overflow-hidden rounded-2xl bg-slate-800">
                <h3 className="mb-2 text-center font-semibold">
                  Participant
                </h3>

                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>

            </div>

            <div className="mt-6 flex justify-center flex-wrap gap-4">

              <button
                onClick={toggleMute}
                className="rounded-xl bg-yellow-500 px-4 py-2 font-medium"
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>

              <button
                onClick={toggleCamera}
                className="rounded-xl bg-indigo-500 px-4 py-2 font-medium"
              >
                {isCameraOff
                  ? "Turn Camera On"
                  : "Turn Camera Off"}
              </button>

              <button
                onClick={leaveMeeting}
                className="rounded-xl bg-red-500 px-4 py-2 font-medium"
              >
                Leave Meeting
              </button>

            </div>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

            <h3 className="mb-4 text-xl font-semibold">
              Participants
            </h3>

            <div className="mb-6 rounded-xl bg-slate-800 p-4">
              {participants} Participant(s)
            </div>

            <h3 className="mb-4 text-xl font-semibold">
              Chat
            </h3>

            <div className="mb-4 h-[250px] overflow-y-auto rounded-xl bg-slate-800 p-4">

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className="mb-2 rounded-lg bg-slate-700 p-2"
                >
                  {msg.message}
                </div>
              ))}

            </div>

            <div className="flex gap-2">

              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none"
              />

              <button
                onClick={sendMessage}
                className="rounded-xl bg-indigo-500 px-4 py-2 font-medium hover:bg-indigo-600"
              >
                Send
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default MeetingRoom;