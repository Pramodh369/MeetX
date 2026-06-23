import { Link } from "react-router-dom";

function CTA() {
return ( <section className="px-6 py-24"> <div className="mx-auto max-w-5xl rounded-3xl border border-indigo-500/20 bg-white/[0.02] p-12 text-center">

    <div className="mb-4 inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-400">
      Get Started Today
    </div>

    <h2 className="mb-6 text-4xl font-bold md:text-5xl">
      Ready To Start Your
      <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
        First Meeting?
      </span>
    </h2>

    <p className="mx-auto mb-8 max-w-2xl text-slate-400">
      Create secure video meetings, collaborate in real-time,
      share screens and communicate with your team from anywhere.
    </p>

    <div className="flex flex-wrap justify-center gap-4">

      <Link
        to="/register"
        className="rounded-xl bg-indigo-500 px-8 py-3 font-medium transition hover:bg-indigo-600"
      >
        Get Started
      </Link>

      <Link
        to="/login"
        className="rounded-xl border border-white/10 px-8 py-3 font-medium transition hover:bg-white/5"
      >
        Sign In
      </Link>

    </div>

  </div>
</section>
);
}

export default CTA;
