const StatCard = ({ title, value, icon }) => {
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
            {value}
          </h2>
        </div>

        <div className="rounded-3xl bg-linear-to-r from-indigo-500 to-pink-500 p-4 text-white shadow-lg shadow-indigo-500/30 transition group-hover:scale-110">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;