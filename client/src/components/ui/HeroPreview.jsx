import { useState, useEffect } from "react";

function HeroPreview() {
  const [timer, setTimer] = useState(0);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTimer((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const d = setInterval(() => setActiveDot((s) => (s + 1) % 3), 800);
    return () => clearInterval(d);
  }, []);

  const fmt = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sc = (s % 60).toString().padStart(2, "0");
    return `${m}:${sc}`;
  };

  return (
    <div className="relative mx-auto w-full max-w-lg select-none">

      {/* Outer ambient glow */}
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-indigo-500/25 via-cyan-500/10 to-purple-500/20 blur-3xl" />
      <div className="absolute -inset-2 rounded-3xl bg-indigo-500/10 blur-xl" />

      {/* Main card */}
      <div
        className="relative rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl backdrop-blur-2xl
                   transition-all duration-500 hover:border-indigo-500/40 hover:shadow-indigo-500/10"
        style={{ animation: "heroFloat 6s ease-in-out infinite" }}
      >

        {/* ── Header ── */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>
            <div>
              <p className="text-xs text-slate-400 leading-none mb-0.5">Live Meeting</p>
              <h3 className="text-sm font-semibold text-white leading-none">MeetX </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-800/80 px-2.5 py-1 text-xs font-mono text-slate-300">
              <svg className="h-3 w-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {fmt(timer)}
            </span>
            {/* Participant count = 2 */}
            <span className="flex items-center gap-1 rounded-full border border-white/10 bg-slate-800/80 px-2.5 py-1 text-xs text-slate-300">
              <svg className="h-3 w-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
              2
            </span>
            <span className="rounded-full bg-green-500/15 border border-green-500/25 px-2.5 py-1 text-xs font-medium text-green-400">
              Live
            </span>
          </div>
        </div>

        {/* ── 2×2 Grid ── */}
        <div className="grid grid-cols-2 gap-2.5">

          {/* ── Top Left: Hinata — camera on, fake girl office bg ── */}
          <div className="group relative aspect-video overflow-hidden rounded-2xl border border-white/8
                          transition-all duration-300 hover:border-pink-400/50 hover:shadow-lg hover:shadow-pink-500/20">

            {/* Fake office background — warm bokeh layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/70 via-rose-900/40 to-slate-800/80" />
            {/* Bookshelf blob */}
            <div className="absolute top-0 right-0 h-full w-1/3 bg-amber-800/30 blur-sm" />
            {/* Window light bloom */}
            <div className="absolute top-1 left-2 h-10 w-10 rounded-full bg-amber-300/20 blur-2xl" />
            <div className="absolute bottom-3 right-3 h-6 w-6 rounded-full bg-rose-300/15 blur-xl" />
            {/* Desk line suggestion */}
            <div className="absolute bottom-5 left-0 right-0 h-px bg-amber-700/30" />
            {/* Plant silhouette blob */}
            <div className="absolute bottom-4 left-1 h-8 w-4 rounded-t-full bg-emerald-800/40 blur-sm" />

            {/* Avatar */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-pink-500/40">
                  H
                </div>
                {/* Speaking indicator ring */}
                <span className="absolute -inset-0.5 rounded-full border-2 border-pink-400/70 animate-pulse" />
              </div>
              <span className="text-[10px] font-medium text-white/90 drop-shadow">Hinata</span>
            </div>

            {/* Bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2 py-1.5
                            bg-gradient-to-t from-black/70 to-transparent">
              <span className="text-[9px] font-medium text-white/80">Hinata</span>
              <div className="flex items-center gap-1">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-pink-500/80">
                  <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 10-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"/>
                  </svg>
                </span>
                <div className="flex items-end gap-px h-3">
                  {[2, 4, 3, 4, 2].map((h, i) => (
                    <span
                      key={i}
                      className="w-0.5 rounded-full bg-pink-400"
                      style={{
                        height: `${h * 2}px`,
                        animation: `soundBar 0.8s ease-in-out ${i * 0.1}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* YOU badge */}
            <div className="absolute top-1.5 left-1.5">
              <span className="rounded-md bg-pink-500/80 px-1.5 py-0.5 text-[8px] font-semibold text-white backdrop-blur-sm">
                YOU
              </span>
            </div>
          </div>

          {/* ── Top Right: Pramodh — camera off, HOST ── */}
          <div className="group relative aspect-video overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-slate-800/80 to-slate-900/80
                          transition-all duration-300 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-slate-900/40" />
            <div className="absolute top-3 left-4 h-10 w-10 rounded-full bg-purple-400/15 blur-xl" />

            {/* Avatar */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-violet-500/40">
                P
              </div>
              <span className="text-[10px] font-medium text-white/90">Pramodh</span>
            </div>

            {/* Bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2 py-1.5
                            bg-gradient-to-t from-black/60 to-transparent">
              <span className="text-[9px] font-medium text-white/80">Pramodh</span>
              <div className="flex items-center gap-1">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500/80">
                  <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                  </svg>
                </span>
                <span className="text-[8px] text-red-400 font-medium">Cam off</span>
              </div>
            </div>

            {/* HOST badge */}
            <div className="absolute top-1.5 left-1.5">
              <span className="rounded-md bg-purple-500/80 px-1.5 py-0.5 text-[8px] font-semibold text-white backdrop-blur-sm">
                HOST
              </span>
            </div>
          </div>

          {/* ── Bottom Left: VS Code screen share ── */}
          <div className="group relative aspect-video overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#1e1e2e]
                          transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20">

            <div className="absolute inset-0 p-1.5 flex flex-col gap-0 font-mono text-[6px] leading-tight">

              {/* VS Code title bar */}
              <div className="flex items-center gap-1 bg-[#181825] px-1.5 py-1 rounded-t-md mb-0.5">
                <div className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
                <div className="h-1.5 w-1.5 rounded-full bg-yellow-400/80" />
                <div className="h-1.5 w-1.5 rounded-full bg-green-400/80" />
                <span className="ml-1 text-[6px] text-slate-400">HeroPreview.jsx — VS Code</span>
              </div>

              {/* Tab bar */}
              <div className="flex items-center gap-0.5 bg-[#181825] px-1 mb-0.5">
                <span className="rounded-t px-1.5 py-0.5 bg-[#1e1e2e] text-[5px] text-cyan-300 border-t border-cyan-400/50">HeroPreview.jsx</span>
                <span className="rounded-t px-1.5 py-0.5 text-[5px] text-slate-500">App.jsx</span>
              </div>

              {/* Code lines */}
              <div className="flex flex-col gap-px px-1 flex-1 overflow-hidden">
                {[
                  { ln: "1",  color: "text-slate-500",  code: "import { useState } from 'react';" },
                  { ln: "2",  color: "text-slate-700",  code: "" },
                  { ln: "3",  color: "text-purple-400", code: "function HeroPreview() {" },
                  { ln: "4",  color: "text-cyan-300",   code: "  const [timer, setTimer] = useState(0);" },
                  { ln: "5",  color: "text-slate-700",  code: "" },
                  { ln: "6",  color: "text-yellow-300", code: "  useEffect(() => {" },
                  { ln: "7",  color: "text-slate-300",  code: "    const t = setInterval(" },
                  { ln: "8",  color: "text-green-300",  code: "      () => setTimer(s => s+1), 1000" },
                  { ln: "9",  color: "text-yellow-300", code: "    );" },
                  { ln: "10", color: "text-slate-300",  code: "    return () => clearInterval(t);" },
                ].map(({ ln, color, code }) => (
                  <div key={ln} className="flex items-start gap-1.5">
                    <span className="text-slate-600 w-3 shrink-0 text-right">{ln}</span>
                    <span className={color}>{code}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Screen share label */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2 py-1.5
                            bg-gradient-to-t from-black/70 to-transparent">
              <span className="text-[9px] font-medium text-cyan-300">💻</span>
              <span className="rounded-md bg-cyan-500/20 border border-cyan-500/30 px-1.5 py-0.5 text-[8px] font-semibold text-cyan-300">
                SCREEN SHARE
              </span>
            </div>
          </div>

          {/* ── Bottom Right: Chat — Hinata & Pramodh, web dev convo ── */}
          <div className="group relative aspect-video overflow-hidden rounded-2xl border border-white/8 bg-slate-900/90
                          transition-all duration-300 hover:border-slate-500/50 hover:shadow-lg">

            <div className="absolute inset-0 flex flex-col p-2.5 gap-1.5">
              {/* Chat header */}
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[9px] font-semibold text-slate-300 uppercase tracking-wide">Meeting Chat</span>
                <span className="text-[8px] text-slate-500">3 msgs</span>
              </div>

              {/* Messages */}
              <div className="flex flex-col gap-1.5 flex-1">
                {/* Message 1 — Pramodh */}
                <div className="flex items-start gap-1.5">
                  <div className="h-4 w-4 shrink-0 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-[7px] font-bold text-white">
                    P
                  </div>
                  <div className="flex-1">
                    <p className="text-[8px] text-violet-300 font-medium mb-0.5">Pramodh</p>
                    <div className="rounded-lg rounded-tl-none bg-violet-500/20 border border-violet-500/20 px-1.5 py-1">
                      <p className="text-[8px] text-slate-200 leading-tight">Can you share your code? </p>
                    </div>
                  </div>
                </div>

                {/* Message 2 — Hinata */}
                <div className="flex items-start gap-1.5">
                  <div className="h-4 w-4 shrink-0 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-[7px] font-bold text-white">
                    H
                  </div>
                  <div className="flex-1">
                    <p className="text-[8px] text-pink-300 font-medium mb-0.5">Hinata</p>
                    <div className="rounded-lg rounded-tl-none bg-slate-700/60 border border-white/8 px-1.5 py-1">
                      <p className="text-[8px] text-slate-200 leading-tight">Sure! 👍</p>
                    </div>
                  </div>
                </div>

                {/* Message 3 — Pramodh */}
                <div className="flex items-start gap-1.5">
                  <div className="h-4 w-4 shrink-0 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-[7px] font-bold text-white">
                    P
                  </div>
                  <div className="flex-1">
                    <p className="text-[8px] text-violet-300 font-medium mb-0.5">Pramodh</p>
                    <div className="rounded-lg rounded-tl-none bg-slate-700/60 border border-white/8 px-1.5 py-1">
                      <p className="text-[8px] text-slate-200 leading-tight">Nice,</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Typing indicator — Hinata */}
              <div className="flex items-center gap-1.5 mt-auto">
                <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-[6px] font-bold text-white">
                  H
                </div>
                <div className="flex items-center gap-0.5 rounded-full bg-slate-700/60 px-2 py-0.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={`h-1 w-1 rounded-full transition-all duration-300 ${
                        activeDot === i ? "bg-pink-400 scale-125" : "bg-slate-500"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[7px] text-slate-500">typing…</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom Controls ── */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] text-slate-400">HD · 1080p</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="group/btn relative flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80 border border-white/10
                               transition-all duration-200 hover:border-pink-400/50 hover:bg-pink-500/20">
              <svg className="h-3.5 w-3.5 text-slate-300 group-hover/btn:text-pink-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 10-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"/>
              </svg>
            </button>

            <button className="group/btn flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80 border border-white/10
                               transition-all duration-200 hover:border-pink-400/50 hover:bg-pink-500/20">
              <svg className="h-3.5 w-3.5 text-slate-300 group-hover/btn:text-pink-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
              </svg>
            </button>

            <button className="group/btn flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80 border border-white/10
                               transition-all duration-200 hover:border-cyan-400/50 hover:bg-cyan-500/20">
              <svg className="h-3.5 w-3.5 text-slate-300 group-hover/btn:text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd"/>
              </svg>
            </button>

            {/* End call */}
            <button className="flex h-8 w-14 items-center justify-center rounded-full bg-red-500 shadow-lg shadow-red-500/30
                               transition-all duration-200 hover:bg-red-600 hover:shadow-red-500/50 hover:scale-105">
              <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-1">
            {["👍", "🎉"].map((e) => (
              <span key={e} className="cursor-pointer rounded-full bg-slate-800/60 border border-white/8 px-1.5 py-0.5 text-[10px]
                                       transition-transform hover:scale-110">
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes soundBar {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

export default HeroPreview;