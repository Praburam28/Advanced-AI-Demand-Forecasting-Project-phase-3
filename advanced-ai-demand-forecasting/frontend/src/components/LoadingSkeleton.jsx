const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-6 h-10 w-72 rounded-2xl bg-slate-200 dark:bg-slate-800"></div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-36 rounded-3xl bg-slate-200 shadow-xl dark:bg-slate-800"
          ></div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="h-80 rounded-3xl bg-slate-200 shadow-xl dark:bg-slate-800"></div>
        <div className="h-80 rounded-3xl bg-slate-200 shadow-xl dark:bg-slate-800"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;