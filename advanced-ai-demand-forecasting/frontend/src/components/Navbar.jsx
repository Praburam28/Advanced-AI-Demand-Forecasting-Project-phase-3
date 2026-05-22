import { Menu, LogOut, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/dashboard");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const newNotification = {
        id: Date.now(),
        title: data.type || "Notification",
        message: data.message || "System update received",
        time: new Date().toLocaleTimeString(),
      };

      setNotifications((prev) => [newNotification, ...prev]);
    };

    return () => socket.close();
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-[#0f172a] px-8 py-6 text-white shadow-xl">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <button
            onClick={toggleSidebar}
            className="rounded-2xl bg-white/10 p-4 xl:hidden"
          >
            <Menu size={34} />
          </button>

          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Advanced AI Demand Forecasting
            </h1>
            <p className="mt-1 text-lg text-slate-400">
              Forecasting • Analytics • Reports • Monitoring
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="relative rounded-2xl bg-indigo-600/20 p-4 text-indigo-300"
            >
              <Bell size={28} />

              {notifications.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-sm font-black text-white">
                  {notifications.length}
                </span>
              )}
            </button>

            {open && (
              <div className="absolute right-0 mt-4 w-96 rounded-3xl border border-slate-700 bg-[#111827] p-4 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-black">Notifications</h3>

                  <button
                    onClick={() => setNotifications([])}
                    className="rounded-xl bg-slate-800 px-3 py-2 text-sm font-bold text-slate-300"
                  >
                    Clear
                  </button>
                </div>

                <div className="max-h-96 space-y-3 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-center text-slate-400">
                      No notifications yet.
                    </p>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-slate-700 bg-slate-900 p-4"
                      >
                        <p className="font-black text-indigo-300">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-300">
                          {item.message}
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                          {item.time}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <ThemeToggle />

          <div className="hidden rounded-2xl bg-white/10 px-5 py-3 md:block">
            <p className="text-lg font-black">{user?.full_name || "Admin User"}</p>
            <p className="text-base text-slate-400">{user?.role || "Super Admin"}</p>
          </div>

          <button
            onClick={logout}
            className="rounded-2xl bg-red-600/20 p-4 text-red-300"
          >
            <LogOut size={28} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;