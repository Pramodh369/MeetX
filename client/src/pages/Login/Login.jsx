import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
const navigate = useNavigate();

const [formData, setFormData] = useState({
email: "",
password: "",
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
  const { data } = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/auth/login`,
  formData
);

  localStorage.setItem("token", data.token);

  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );

  navigate("/dashboard");
} catch (error) {
  alert(
    error.response?.data?.message ||
      "Login failed"
  );
}

};

return ( <div className="min-h-screen flex items-center justify-center px-6"> <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
    <h1 className="mb-2 text-center text-4xl font-bold">
      Welcome Back
    </h1>

    <p className="mb-8 text-center text-slate-400">
      Sign in to continue to MeetX.
    </p>

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
      />

      <button
        type="submit"
        className="w-full rounded-xl bg-indigo-500 py-3 font-medium transition hover:bg-indigo-600"
      >
        Sign In
      </button>

    </form>

    <p className="mt-6 text-center text-slate-400">
      Don't have an account?{" "}
      <Link
        to="/register"
        className="text-indigo-400 hover:text-indigo-300"
      >
        Create Account
      </Link>
    </p>

  </div>
</div>
);
}

export default Login;
