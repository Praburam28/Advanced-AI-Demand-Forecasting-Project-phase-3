import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form.email, form.password);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="w-full max-w-md rounded-3xl border border-white/30 bg-white/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-linear-to-r from-indigo-500 to-pink-500 text-white shadow-lg">
            <Sparkles size={30} />
          </div>

          <h1 className="text-3xl font-black text-slate-900">
            AI Demand Forecasting
          </h1>
          <p className="mt-2 text-slate-500">Login to your account</p>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Email Address
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <Mail size={18} className="text-indigo-500" />
              <input
                name="email"
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border-none bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Password
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <Lock size={18} className="text-indigo-500" />
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border-none bg-transparent outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-linear-to-r from-indigo-600 to-pink-500 py-3 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          New user?{" "}
          <Link to="/register" className="font-bold text-indigo-600">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;