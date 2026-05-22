import { useState } from "react";
import {
  Search as SearchIcon,
  Database,
  LineChart,
  FileText,
  Users,
  Sparkles,
} from "lucide-react";
import API from "../api/api";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    if (!keyword.trim()) {
      alert("Please enter a search keyword");
      return;
    }

    const res = await API.get(`/search/global?keyword=${keyword}`);
    setResults(res.data);
  };

  const ResultSection = ({ title, icon, data, columns }) => (
    <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl">
      <div className="mb-6 flex items-center gap-4">
        <div className="rounded-2xl bg-indigo-600/20 p-4 text-indigo-300">
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-black">{title}</h2>
          <p className="text-slate-400">{data.length} results found</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="w-full min-w-175 text-left text-lg">
          <thead className="bg-slate-800">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="p-5">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-t border-slate-800">
                {columns.map((col) => (
                  <td key={col.key} className="p-5">
                    {item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <p className="mt-6 text-center text-lg text-slate-400">
          No records found.
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-8 text-white">
      <div className="flex flex-col justify-between gap-5 rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl md:flex-row md:items-center">
        <div className="flex items-center gap-5">
          <div className="rounded-3xl bg-linear-to-br from-indigo-500 to-pink-500 p-5 shadow-xl">
            <SearchIcon size={46} />
          </div>

          <div>
            <h1 className="text-4xl font-black">Global Search</h1>
            <p className="mt-1 text-lg text-slate-400">
              Search datasets, forecasts, reports and users in one place
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-linear-to-r from-indigo-600 to-pink-500 px-6 py-4 text-lg font-black shadow-xl">
          Smart Search
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-2xl bg-purple-600/20 p-4 text-purple-300">
            <Sparkles size={34} />
          </div>
          <div>
            <h2 className="text-2xl font-black">Search Anything</h2>
            <p className="text-slate-400">
              Enter keyword to search across the whole forecasting system
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Example: Electronics, Ensemble, Report, Admin..."
            className="flex-1 rounded-2xl border border-slate-700 bg-slate-900 px-6 py-5 text-xl outline-none focus:border-indigo-500"
          />

          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-indigo-600 to-pink-500 px-8 py-5 text-xl font-black shadow-xl"
          >
            <SearchIcon size={30} />
            Search
          </button>
        </div>
      </div>

      {results && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
              <p className="text-lg text-slate-400">Datasets</p>
              <h2 className="mt-2 text-4xl font-black">
                {results.datasets.length}
              </h2>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
              <p className="text-lg text-slate-400">Forecasts</p>
              <h2 className="mt-2 text-4xl font-black">
                {results.forecasts.length}
              </h2>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
              <p className="text-lg text-slate-400">Reports</p>
              <h2 className="mt-2 text-4xl font-black">
                {results.reports.length}
              </h2>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
              <p className="text-lg text-slate-400">Users</p>
              <h2 className="mt-2 text-4xl font-black">
                {results.users?.length || 0}
              </h2>
            </div>
          </div>

          <ResultSection
            title="Dataset Results"
            icon={<Database size={34} />}
            data={results.datasets || []}
            columns={[
              { key: "id", label: "ID" },
              { key: "name", label: "Dataset Name" },
              { key: "region", label: "Region" },
            ]}
          />

          <ResultSection
            title="Forecast Results"
            icon={<LineChart size={34} />}
            data={results.forecasts || []}
            columns={[
              { key: "id", label: "ID" },
              { key: "model_name", label: "Model Name" },
              { key: "predicted_demand", label: "Predicted Demand" },
            ]}
          />

          <ResultSection
            title="Report Results"
            icon={<FileText size={34} />}
            data={results.reports || []}
            columns={[
              { key: "id", label: "ID" },
              { key: "title", label: "Report Title" },
            ]}
          />

          {results.users && (
            <ResultSection
              title="User Results"
              icon={<Users size={34} />}
              data={results.users || []}
              columns={[
                { key: "id", label: "ID" },
                { key: "full_name", label: "Full Name" },
                { key: "role", label: "Role" },
              ]}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Search;