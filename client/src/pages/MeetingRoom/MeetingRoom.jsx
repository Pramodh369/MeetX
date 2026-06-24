import { useEffect, useState, useRef, useCallback } from "react";
import Peer from "simple-peer";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://192.168.1.27:5000");

function MeetingRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [participants, setParticipants] = useState(0);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [remoteConnected, setRemoteConnected] = useState(false);
  const [mediaError, setMediaError] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const peerRef = useRef(null);
  const isInitiatorRef = useRef(false);
  const isReadyRef = useRef(false);
  const pendingOfferRef = useRef(null);
  const createInitiatorPeerRef = useRef(null);
  const createAnswererPeerRef = useRef(null);

  // ─── Create Initiator Peer ────────────────────────────────────────────────
  const createInitiatorPeer = useCallback(() => {
    if (peerRef.current) return;

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: localStreamRef.current,
    });

    peer.on("signal", (data) => {
      socket.emit("offer", { roomId, signal: data });
    });

    peer.on("stream", (remoteStream) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
      setRemoteConnected(true);
    });

    peer.on("error", (err) => console.error("Peer error:", err));

    peer.on("close", () => {
      setRemoteConnected(false);
      peerRef.current = null;
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    });

    peerRef.current = peer;
  }, [roomId]);

  // ─── Create Answerer Peer ─────────────────────────────────────────────────
  const createAnswererPeer = useCallback((incomingSignal) => {
    if (peerRef.current) return;

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: localStreamRef.current,
    });

    peer.on("signal", (data) => {
      socket.emit("answer", { roomId, signal: data });
    });

    peer.on("stream", (remoteStream) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
      setRemoteConnected(true);
    });

    peer.on("error", (err) => console.error("Peer error:", err));

    peer.on("close", () => {
      setRemoteConnected(false);
      peerRef.current = null;
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    });

    peerRef.current = peer;
    peer.signal(incomingSignal);
  }, [roomId]);

  createInitiatorPeerRef.current = createInitiatorPeer;
  createAnswererPeerRef.current = createAnswererPeer;

  // ─── Step 1: Get Camera + Mic ─────────────────────────────────────────────
  useEffect(() => {
    let isMounted = true; // guards against StrictMode double-invoke

    const getMedia = async () => {
      try {
        if (!navigator.mediaDevices) {
          setMediaError("Camera not available. Use HTTPS or localhost.");
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (!isMounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        if (isReadyRef.current && isInitiatorRef.current) {
          createInitiatorPeerRef.current();
        }

        if (pendingOfferRef.current) {
          createAnswererPeerRef.current(pendingOfferRef.current);
          pendingOfferRef.current = null;
        }
      } catch (err) {
        console.error("Camera/mic error:", err);
        setMediaError(`${err.name}: ${err.message}`);
      }
    };

    getMedia();

    return () => {
      isMounted = false;
    };
  }, []);

  // ─── Step 2: Socket Events ────────────────────────────────────────────────
  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("participant-count", (count) => {
      setParticipants(count);
      if (count === 1) {
        isInitiatorRef.current = true;
      }
    });

    socket.on("ready", () => {
      isReadyRef.current = true;
      if (isInitiatorRef.current && localStreamRef.current) {
        createInitiatorPeerRef.current();
      }
    });

    socket.on("offer", ({ signal }) => {
      if (isInitiatorRef.current) return;
      if (!localStreamRef.current) {
        pendingOfferRef.current = signal;
        return;
      }
      createAnswererPeerRef.current(signal);
    });

    socket.on("answer", ({ signal }) => {
      if (peerRef.current) {
        peerRef.current.signal(signal);
      }
    });

    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("participant-count");
      socket.off("ready");
      socket.off("offer");
      socket.off("answer");
      socket.off("receive-message");
      socket.emit("leave-room", roomId);
    };
  }, [roomId]);

  // ─── Controls ─────────────────────────────────────────────────────────────
  const toggleMute = () => {
    const track = localStreamRef.current?.getAudioTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setIsMuted(!track.enabled);
  };

  const toggleCamera = () => {
    const track = localStreamRef.current?.getVideoTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setIsCameraOff(!track.enabled);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("send-message", { roomId, message });
    setMessage("");
  };

  const leaveMeeting = () => {
    peerRef.current?.destroy();
    peerRef.current = null;
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
    navigate("/dashboard");
  };

  // ─── UI ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-4xl font-bold">Meeting Room</h1>
          <p className="mt-3 text-slate-400">Room ID: {roomId}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Video Grid */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="grid h-[450px] gap-4 md:grid-cols-2">

              {/* Local */}
              <div className="relative overflow-hidden rounded-2xl bg-slate-800 flex items-center justify-center">
                <p className="absolute top-2 left-2 z-10 text-xs font-semibold bg-black/50 px-2 py-1 rounded">
                  You {isMuted ? "🔇" : ""} {isCameraOff ? "📷✗" : ""}
                </p>
                {mediaError ? (
                  <p className="text-red-400 text-sm text-center px-4">{mediaError}</p>
                ) : null}
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="h-full w-full object-cover -scale-x-100"
                />
              </div>

              {/* Remote */}
              <div className="relative overflow-hidden rounded-2xl bg-slate-800 flex items-center justify-center">
                <p className="absolute top-2 left-2 z-10 text-xs font-semibold bg-black/50 px-2 py-1 rounded">
                  Participant
                </p>
                {!remoteConnected && (
                  <p className="text-slate-500 text-sm">Waiting for participant...</p>
                )}
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 flex justify-center flex-wrap gap-4">
              <button
                onClick={toggleMute}
                className={`rounded-xl px-4 py-2 font-medium ${isMuted ? "bg-red-500" : "bg-yellow-500"}`}
              >
                {isMuted ? "Unmute 🔇" : "Mute 🎤"}
              </button>

              <button
                onClick={toggleCamera}
                className={`rounded-xl px-4 py-2 font-medium ${isCameraOff ? "bg-red-500" : "bg-indigo-500"}`}
              >
                {isCameraOff ? "Camera On 📷" : "Camera Off 📷"}
              </button>

              <button
                onClick={leaveMeeting}
                className="rounded-xl bg-red-600 px-4 py-2 font-medium hover:bg-red-700"
              >
                Leave Meeting
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col">
            <h3 className="mb-4 text-xl font-semibold">Participants</h3>
            <div className="mb-6 rounded-xl bg-slate-800 p-4 text-sm">
              {participants} Participant(s)
            </div>

            <h3 className="mb-4 text-xl font-semibold">Chat</h3>
            <div className="mb-4 flex-1 min-h-[200px] max-h-[300px] overflow-y-auto rounded-xl bg-slate-800 p-4 space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-2 text-sm ${
                    msg.system ? "bg-slate-700 text-slate-400 italic" : "bg-slate-700"
                  }`}
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
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none text-sm"
              />
              <button
                onClick={sendMessage}
                className="rounded-xl bg-indigo-500 px-4 py-2 font-medium text-sm hover:bg-indigo-600"
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