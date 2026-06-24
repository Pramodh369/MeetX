import { Link } from "react-router-dom";
import Logo from "../common/Logo";

function Navbar() {
  return (
    <nav
      id="navbar"
      className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl transition-all duration-300"
    >
      {" "}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div id="logo-wrapper">
          <Logo />
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features">Features</a>

          <a href="#workflow">Workflow</a>

          <a href="#techstack">Tech Stack</a>

          <a href="#architecture">Architecture</a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-xl border border-white/10 px-5 py-2 text-sm transition hover:bg-white/5"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-indigo-500 px-5 py-2 text-sm font-medium transition hover:bg-indigo-600"
          >
            Get Started
          </Link>
        </div>

        <button className="text-2xl md:hidden">☰</button>
      </div>
    </nav>
  );
}

export default Navbar;
