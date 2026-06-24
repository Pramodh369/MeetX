function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-slate-950">
      
      {/* Glow Effects */}
      <div className="absolute h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"></div>
      <div className="absolute right-20 top-20 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl"></div>

      <div className="relative flex flex-col items-center">

        {/* Logo Circle */}
        <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
          
          <div className="absolute inset-0 animate-ping rounded-full bg-indigo-500/20"></div>

          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-slate-700 border-t-indigo-500"></div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500 text-3xl font-bold text-white shadow-lg shadow-indigo-500/30">
            MX
          </div>
        </div>

        {/* Brand */}
        <h1 className="bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-6xl font-extrabold text-transparent">
          MeetX
        </h1>

        <p className="mt-4 text-lg text-slate-400">
          Connecting people across the world...
        </p>

        {/* Loading dots */}
        <div className="mt-6 flex gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400"></span>
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-indigo-400"
            style={{ animationDelay: "0.15s" }}
          ></span>
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-indigo-400"
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;