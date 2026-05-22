import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { registerUser } from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "Viewer",
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
      await registerUser(form);
      alert("Account created successfully");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="hidden flex-col justify-between bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-12 lg:flex">
          <div>
            <div className="mb-10 flex items-center gap-4">
              <div className="rounded-3xl bg-white/20 p-4">
                <Sparkles size={42} />
              </div>

              <div>
                <h1 className="text-4xl font-black">AI Forecast</h1>
                <p className="text-lg text-white/80">Enterprise SaaS Platform</p>
              </div>
            </div>

            <h2 className="max-w-xl text-6xl font-black leading-tight">
              Create your forecasting workspace.
            </h2>

            <p className="mt-6 max-w-xl text-xl text-white/85">
              Manage datasets, generate AI demand forecasts, monitor performance,
              and create business reports with a powerful enterprise dashboard.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-3xl bg-white/15 p-5 backdrop-blur">
              <p className="text-3xl font-black">AI</p>
              <p className="text-white/80">Forecasting</p>
            </div>

            <div className="rounded-3xl bg-white/15 p-5 backdrop-blur">
              <p className="text-3xl font-black">RBAC</p>
              <p className="text-white/80">Security</p>
            </div>

            <div className="rounded-3xl bg-white/15 p-5 backdrop-blur">
              <p className="text-3xl font-black">Live</p>
              <p className="text-white/80">Analytics</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-xl rounded-4xl border border-slate-800 bg-[#111827] p-8 shadow-2xl">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-r from-indigo-600 to-pink-500 shadow-xl">
                <ShieldCheck size={42} />
              </div>

              <h1 className="text-4xl font-black">Create Account</h1>
              <p className="mt-2 text-lg text-slate-400">
                Register to access the AI forecasting dashboard
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl bg-red-600/20 px-5 py-4 text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-lg font-bold">Full Name</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4">
                  <User size={24} className="text-indigo-400" />
                  <input
                    name="full_name"
                    placeholder="Enter full name"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-lg font-bold">Email Address</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4">
                  <Mail size={24} className="text-indigo-400" />
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-lg font-bold">Password</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4">
                  <Lock size={24} className="text-indigo-400" />
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-lg font-bold">User Role</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4">
                  <ShieldCheck size={24} className="text-indigo-400" />
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full bg-slate-900 text-lg outline-none"
                  >
                    <option value="Viewer">Viewer</option>
                    <option value="Analyst">Analyst</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-indigo-600 to-pink-500 px-6 py-4 text-xl font-black shadow-xl transition hover:-translate-y-1"
              >
                Create Account
                <ArrowRight size={26} />
              </button>
            </form>

            <p className="mt-7 text-center text-lg text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="font-black text-indigo-400">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;