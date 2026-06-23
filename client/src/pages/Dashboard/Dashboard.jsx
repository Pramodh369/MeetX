import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const [roomId, setRoomId] = useState("");
  const [meetings, setMeetings] = useState([]);

  const joinMeeting = () => {
    if (!roomId.trim()) {
      alert("Please enter a Room ID");
      return;
    }

    navigate(`/meeting/${roomId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const createMeeting = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:5000/api/meeting/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate(`/meeting/${data.meeting.roomId}`);
    } catch (error) {
      console.log(error);
      alert("Failed to create meeting");
    }
  };
  const getMyMeetings = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/meeting/my-meetings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMeetings(data.meetings);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMyMeetings();
  }, []);
  return (
    <div className="min-h-screen px-6 py-10">
      {" "}
      <div className="mx-auto max-w-7xl">
        {/* Welcome Card */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h1 className="text-4xl font-bold">Welcome, {user?.name}</h1>

          <p className="mt-2 text-slate-400">{user?.email}</p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-slate-400">Meetings Created</h3>

            <p className="mt-3 text-4xl font-bold">{meetings.length}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-slate-400">Meetings Joined</h3>

            <p className="mt-3 text-4xl font-bold">0</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-slate-400">Hours Spent</h3>

             <p className="mt-3 text-4xl font-bold">0</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            onClick={createMeeting}
            className="rounded-xl bg-indigo-500 px-8 py-3 font-medium transition hover:bg-indigo-600"
          >
            Create Meeting
          </button>

          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
            />

            <button
              onClick={joinMeeting}
              className="rounded-xl border border-white/10 px-8 py-3 font-medium transition hover:bg-white/5"
            >
              Join Meeting
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500 px-8 py-3 font-medium transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 text-2xl font-bold">Recent Meetings</h2>

          <div className="space-y-3">
            {meetings.map((meeting) => (
              <div
                key={meeting._id}
                onClick={() => navigate(`/meeting/${meeting.roomId}`)}
                className="cursor-pointer rounded-xl border border-white/10 p-4 transition hover:bg-white/5"
              >
                {meeting.roomId}
              </div>
            ))}

            {meetings.length === 0 && (
              <p className="text-slate-400">No meetings created yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
