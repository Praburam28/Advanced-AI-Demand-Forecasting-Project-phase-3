const ChartCard = ({ title, children }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-2xl">
      <h3 className="mb-6 text-2xl font-black text-white">{title}</h3>
      {children}
    </div>
  );
};

export default ChartCard;