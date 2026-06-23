import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

        <h1 className="mb-2 text-center text-4xl font-bold">
          Create Account
        </h1>

        <p className="mb-8 text-center text-slate-400">
          Join MeetX and start collaborating instantly.
        </p>

        <form className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-500 py-3 font-medium transition hover:bg-indigo-600"
          >
            Create Account
          </button>

        </form>

        <p className="mt-6 text-center text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;