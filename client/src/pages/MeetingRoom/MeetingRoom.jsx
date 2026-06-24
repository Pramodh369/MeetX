import { useEffect, useState, useRef, useCallback } from "react";
import Peer from "simple-peer";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://192.168.1.27:5000");

function MeetingRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  // ─── Read logged-in user from localStorage ──────────────────────────────
  const localUser = JSON.parse(localStorage.getItem("user")) || {};
  const localUserName = localUser.name || "You";

  const [participants, setParticipants] = useState(0);
  const [remoteUserName, setRemoteUserName] = useState(null); // null = not joined yet
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [remoteConnected, setRemoteConnected] = useState(false);
  const [mediaError, setMediaError] = useState(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const peerRef = useRef(null);
  const isInitiatorRef = useRef(false);
  const isReadyRef = useRef(false);
  const pendingOfferRef = useRef(null);
  const createInitiatorPeerRef = useRef(null);
  const createAnswererPeerRef = useRef(null);

  // ─── Meeting Timer ───────────────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => setElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
  };

  // ─── WebRTC — Initiator Peer (untouched logic) ───────────────────────────
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
      setRemoteUserName(null);
      peerRef.current = null;
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    });

    peerRef.current = peer;
  }, [roomId]);

  // ─── WebRTC — Answerer Peer (untouched logic) ────────────────────────────
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
      setRemoteUserName(null);
      peerRef.current = null;
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    });

    peerRef.current = peer;
    peer.signal(incomingSignal);
  }, [roomId]);

  createInitiatorPeerRef.current = createInitiatorPeer;
  createAnswererPeerRef.current = createAnswererPeer;

  // ─── Get local media (untouched logic) ───────────────────────────────────
  useEffect(() => {
    let isMounted = true;

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
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;

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
    return () => { isMounted = false; };
  }, []);

  // ─── Socket events ────────────────────────────────────────────────────────
  useEffect(() => {
    // Send name with join — new payload shape; server handles both old & new
    socket.emit("join-room", { roomId, userName: localUserName });

    socket.on("participant-count", (count) => {
      setParticipants(count);
      if (count === 1) isInitiatorRef.current = true;
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
      if (peerRef.current) peerRef.current.signal(signal);
    });

    // Receive the remote participant's name
    socket.on("remote-user-name", ({ userName }) => {
      setRemoteUserName(userName);
    });

    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("participant-count");
      socket.off("ready");
      socket.off("offer");
      socket.off("answer");
      socket.off("remote-user-name");
      socket.off("receive-message");
      socket.emit("leave-room", roomId);
    };
  }, [roomId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Screen Share (untouched logic) ──────────────────────────────────────
  const replaceVideoTrack = (newTrack) => {
    if (!peerRef.current) return;
    const pc = peerRef.current._pc;
    if (!pc) return;
    const sender = pc.getSenders().find((s) => s.track && s.track.kind === "video");
    if (sender) sender.replaceTrack(newTrack);
  };

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((t) => t.stop());
        screenStreamRef.current = null;
      }
      const cameraTrack = localStreamRef.current?.getVideoTracks()[0];
      if (cameraTrack) {
        replaceVideoTrack(cameraTrack);
        if (localVideoRef.current) localVideoRef.current.srcObject = localStreamRef.current;
      }
      setIsScreenSharing(false);
    } else {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false,
        });
        screenStreamRef.current = screenStream;
        const screenTrack = screenStream.getVideoTracks()[0];

        screenTrack.onended = () => {
          if (screenStreamRef.current) {
            screenStreamRef.current.getTracks().forEach((t) => t.stop());
            screenStreamRef.current = null;
          }
          const cameraTrack = localStreamRef.current?.getVideoTracks()[0];
          if (cameraTrack) {
            replaceVideoTrack(cameraTrack);
            if (localVideoRef.current) localVideoRef.current.srcObject = localStreamRef.current;
          }
          setIsScreenSharing(false);
        };

        replaceVideoTrack(screenTrack);
        if (localVideoRef.current) localVideoRef.current.srcObject = screenStream;
        setIsScreenSharing(true);
      } catch (err) {
        console.error("Screen share error:", err);
        if (err.name !== "NotAllowedError") {
          setMediaError(`Screen share failed: ${err.message}`);
          setTimeout(() => setMediaError(null), 4000);
        }
      }
    }
  };

  // ─── Controls (untouched logic) ──────────────────────────────────────────
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
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
    }
    peerRef.current?.destroy();
    peerRef.current = null;
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
    navigate("/dashboard");
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-4xl font-bold">Meeting Room</h1>
          <div className="mt-3 flex items-center gap-4 flex-wrap">
            <p className="text-slate-400">Room ID: {roomId}</p>
            <span className="text-slate-500">•</span>
            <p className="font-mono text-slate-300 text-sm tracking-widest bg-slate-800 px-3 py-1 rounded-lg">
              ⏱ {formatTime(elapsed)}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Video Area */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="grid h-[450px] gap-4 md:grid-cols-2">

              {/* ── Local Video ── */}
              <div className="relative overflow-hidden rounded-2xl bg-slate-800 flex items-center justify-center">
                {/* Name badge */}
                <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2 px-3 py-2 bg-gradient-to-b from-black/70 to-transparent">
                  <span className="text-xs font-semibold text-white truncate">
                    {localUserName}
                  </span>
                  <div className="flex items-center gap-1 ml-auto">
                    {isMuted && (
                      <span className="text-xs bg-red-500/80 px-1.5 py-0.5 rounded text-white">
                        🔇
                      </span>
                    )}
                    {isCameraOff && (
                      <span className="text-xs bg-red-500/80 px-1.5 py-0.5 rounded text-white">
                        📷✗
                      </span>
                    )}
                    {isScreenSharing && (
                      <span className="text-xs bg-green-500/80 px-1.5 py-0.5 rounded text-white">
                        🖥️ Sharing
                      </span>
                    )}
                  </div>
                </div>

                {mediaError && (
                  <p className="absolute inset-0 flex items-center justify-center text-red-400 text-sm text-center px-4 z-10">
                    {mediaError}
                  </p>
                )}

                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`h-full w-full object-cover ${isScreenSharing ? "" : "-scale-x-100"}`}
                />
              </div>

              {/* ── Remote Video ── */}
              <div className="relative overflow-hidden rounded-2xl bg-slate-800 flex items-center justify-center">
                {/* Name badge — always visible */}
                <div className="absolute top-0 left-0 right-0 z-10 flex items-center px-3 py-2 bg-gradient-to-b from-black/70 to-transparent">
                  <span className="text-xs font-semibold text-white truncate">
                    {remoteUserName ?? "Participant"}
                  </span>
                </div>

                {/* Waiting state — shown when no remote stream yet */}
                {!remoteConnected && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                    {/* Pulsing avatar */}
                    <div className="relative flex items-center justify-center">
                      <span className="absolute inline-flex h-14 w-14 rounded-full bg-slate-600/40 animate-ping" />
                      <span className="relative inline-flex h-14 w-14 rounded-full bg-slate-700 items-center justify-center text-2xl">
                        👤
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm font-medium">
                      Waiting for participant…
                    </p>
                    <p className="text-slate-500 text-xs">
                      Share the Room ID to invite someone
                    </p>
                  </div>
                )}

                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className={`h-full w-full object-cover transition-opacity duration-300 ${
                    remoteConnected ? "opacity-100" : "opacity-0"
                  }`}
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
                onClick={toggleScreenShare}
                className={`rounded-xl px-4 py-2 font-medium ${
                  isScreenSharing
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-slate-600 hover:bg-slate-700"
                }`}
              >
                {isScreenSharing ? "Stop Sharing 🖥️" : "Share Screen 🖥️"}
              </button>

              <button
                onClick={leaveMeeting}
                className="rounded-xl bg-red-600 px-4 py-2 font-medium hover:bg-red-700"
              >
                Leave Meeting
              </button>
            </div>
          </div>

          {/* Sidebar — Participants + Chat */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col">
            <h3 className="mb-4 text-xl font-semibold">Participants</h3>
            <div className="mb-6 rounded-xl bg-slate-800 p-4 text-sm space-y-2">
              {/* Local user always shown */}
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white shrink-0">
                  {localUserName.charAt(0).toUpperCase()}
                </span>
                <span className="truncate text-slate-200">{localUserName}</span>
                <span className="ml-auto text-xs text-indigo-400 shrink-0">You</span>
              </div>

              {/* Remote user — shown only when connected */}
              {remoteConnected && remoteUserName && (
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white shrink-0">
                    {remoteUserName.charAt(0).toUpperCase()}
                  </span>
                  <span className="truncate text-slate-200">{remoteUserName}</span>
                </div>
              )}

              {/* Count */}
              <p className="pt-1 text-xs text-slate-500 border-t border-white/5">
                {participants} participant{participants !== 1 ? "s" : ""} in room
              </p>
            </div>

            <h3 className="mb-4 text-xl font-semibold">Chat</h3>
            <div className="mb-4 flex-1 min-h-[200px] max-h-[300px] overflow-y-auto rounded-xl bg-slate-800 p-4 space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-2 text-sm ${
                    msg.system
                      ? "bg-slate-700/50 text-slate-400 italic"
                      : "bg-slate-700 text-slate-200"
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