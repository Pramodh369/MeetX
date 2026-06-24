function Architecture() {
  return (
    <section id="architecture" className="px-6 py-18">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-400">
            System Architecture
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            How MeetX
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Works Internally
            </span>
          </h2>
        </div>

        {/* Architecture Flow */}
        <div className="grid gap-8 md:grid-cols-4">
          <div
            data-aos="zoom-in"
            data-aos-delay="0"
            className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center"
          >
            <div className="mb-4 text-5xl">👤</div>
            <h3 className="text-xl font-semibold">User</h3>
            <p className="mt-2 text-slate-400">Creates and joins meetings</p>
          </div>

          <div
            data-aos="zoom-in"
            data-aos-delay="150"
            className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center"
          >
            <div className="mb-4 text-5xl">⚛️</div>
            <h3 className="text-xl font-semibold">React Frontend</h3>
            <p className="mt-2 text-slate-400">
              Handles UI and user interactions
            </p>
          </div>

          <div
            data-aos="zoom-in"
            data-aos-delay="300"
            className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center"
          >
            <div className="mb-4 text-5xl">🚀</div>
            <h3 className="text-xl font-semibold">Express API</h3>
            <p className="mt-2 text-slate-400">
              Processes requests and authentication
            </p>
          </div>

          <div
            data-aos="zoom-in"
            data-aos-delay="450"
            className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center"
          >
            <div className="mb-4 text-5xl">🍃</div>
            <h3 className="text-xl font-semibold">MongoDB</h3>
            <p className="mt-2 text-slate-400">Stores users and meeting data</p>
          </div>
        </div>

        {/* Additional Services */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div
            data-aos="fade-up"
            data-aos-delay="0"
            className="rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-6"
          >
            <h3 className="mb-3 text-xl font-semibold">Socket.io</h3>

            <p className="text-slate-400">
              Enables instant messaging and real-time event updates between
              meeting participants.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6"
          >
            <h3 className="mb-3 text-xl font-semibold">WebRTC</h3>

            <p className="text-slate-400">
              Provides peer-to-peer audio and video communication without
              relying on heavy streaming servers.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="rounded-3xl border border-green-500/20 bg-green-500/5 p-6"
          >
            <h3 className="mb-3 text-xl font-semibold">JWT Authentication</h3>

            <p className="text-slate-400">
              Secures protected routes and verifies user identity across the
              application.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Architecture;
