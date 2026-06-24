import { Link } from "react-router-dom";
import HeroPreview from "./HeroPreview";

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}{" "}
      <div className="absolute left-1/2 top-32 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-20 px-6 pt-8 pb-16 lg:grid-cols-2">
        {/* Left Side */}
        <div className="order-2 lg:order-1" data-aos="fade-right">
          <div className="mb-6 inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-400">
            Professional Video Collaboration Platform
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl xl:text-6xl">
            Real-Time Meetings
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              Built For Modern Teams
            </span>
          </h1>

          <p className="mb-10 max-w-lg text-lg leading-8 text-slate-400">
            Connect instantly through secure video meetings, real-time
            messaging, screen sharing and seamless team collaboration from
            anywhere.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="rounded-xl bg-indigo-500 px-7 py-3 font-medium transition-all duration-300 hover:scale-105 hover:bg-indigo-600"
            >
              Start Meeting
            </Link>

            <a
              href="#features"
              className="rounded-xl border border-white/10 px-7 py-3 font-medium transition-all duration-300 hover:border-indigo-500/40 hover:bg-white/5"
            >
              Explore Features
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-10">
            <div>
              <h3 className="text-2xl font-bold text-white">HD</h3>
              <p className="text-sm text-slate-400">Video Calls</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">Live</h3>
              <p className="text-sm text-slate-400">Chat</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">1 Click</h3>
              <p className="text-sm text-slate-400">Screen Share</p>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              Video Calls
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              Screen Sharing
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              Real-Time Chat
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              Meeting Timer
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div
          className="order-1 lg:order-2"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <HeroPreview />
        </div>
      </div>
    </section>
  );
}

export default Hero;
