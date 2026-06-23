function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-lg">

      {/* Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-indigo-500/20 blur-3xl"></div>

      {/* Main Card */}
      <div className="relative rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

        {/* Meeting Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Live Meeting</p>
            <h3 className="font-semibold text-white">
              Product Discussion
            </h3>
          </div>

          <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
            Live
          </span>
        </div>

        {/* Participants */}
        <div className="grid grid-cols-2 gap-3">

          <div className="aspect-video rounded-2xl bg-slate-800"></div>

          <div className="aspect-video rounded-2xl bg-slate-800"></div>

          <div className="aspect-video rounded-2xl bg-slate-800"></div>

          <div className="aspect-video rounded-2xl bg-slate-800"></div>

        </div>

        {/* Bottom Controls */}
        <div className="mt-5 flex justify-center gap-3">

          <button className="rounded-full bg-slate-800 px-4 py-2">
            🎤
          </button>

          <button className="rounded-full bg-slate-800 px-4 py-2">
            📹
          </button>

          <button className="rounded-full bg-red-500 px-4 py-2">
            📞
          </button>

        </div>
      </div>

    </div>
  );
}

export default HeroPreview;