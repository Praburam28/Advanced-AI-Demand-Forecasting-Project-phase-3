import {
  LayoutDashboard,
  Database,
  LineChart,
  BarChart3,
  FileText,
  Users,
  Activity,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ open, close }) => {
  const { user } = useAuth();

  const links = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard, roles: ["Super Admin", "Analyst", "Viewer"] },
    { path: "/datasets", label: "Dataset Management", icon: Database, roles: ["Super Admin", "Analyst", "Viewer"] },
    { path: "/forecasting", label: "AI Forecasting", icon: LineChart, roles: ["Super Admin", "Analyst"] },
    { path: "/analytics", label: "Advanced Analytics", icon: BarChart3, roles: ["Super Admin", "Analyst", "Viewer"] },
    { path: "/reports", label: "Reports & Insights", icon: FileText, roles: ["Super Admin", "Analyst", "Viewer"] },
    { path: "/users", label: "User Management", icon: Users, roles: ["Super Admin"] },
    { path: "/monitoring", label: "System Monitoring", icon: Activity, roles: ["Super Admin"] },
    { path: "/search", label: "Global Search", icon: Search, roles: ["Super Admin", "Analyst", "Viewer"] },
  ];

  return (
    <>
      {open && <div onClick={close} className="fixed inset-0 z-30 bg-black/60 xl:hidden" />}

      <aside className={`fixed left-0 top-0 z-40 h-screen w-80 overflow-y-auto bg-[#080c1f] p-6 text-white shadow-2xl transition-transform xl:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <button onClick={close} className="absolute right-4 top-4 rounded-xl bg-white/10 p-3 xl:hidden">
          <X size={26} />
        </button>

        <div className="mb-8 rounded-3xl bg-linear-to-br from-violet-500 via-purple-500 to-pink-500 p-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/20 p-4">
              <Sparkles size={42} />
            </div>
            <div>
              <h2 className="text-3xl font-black">AI Forecast</h2>
              <p className="text-lg text-white/90">Enterprise Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="space-y-3">
          {links.filter((link) => link.roles.includes(user?.role)).map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={close}
                className={({ isActive }) =>
                  `flex items-center gap-5 rounded-2xl px-6 py-5 text-lg font-black transition ${
                    isActive
                      ? "bg-white text-violet-700 shadow-xl"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={34} strokeWidth={2.6} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-lg font-black">{user?.full_name || "Admin User"}</p>
          <p className="text-base text-slate-400">{user?.role || "Super Admin"}</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;