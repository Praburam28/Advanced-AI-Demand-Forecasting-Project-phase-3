import { useEffect, useState } from "react";
import {
  FileText,
  Download,
  Sparkles,
  FileSpreadsheet,
  FileDown,
  Brain,
} from "lucide-react";
import API from "../api/api";

const Reports = () => {
  const [reports, setReports] = useState([]);

  const [form, setForm] = useState({
    title: "",
    report_type: "pdf",
  });

  const fetchReports = async () => {
    const res = await API.get("/reports");
    setReports(res.data || []);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/reports/generate", form);

    setForm({
      title: "",
      report_type: "pdf",
    });

    fetchReports();
    alert("Report generated successfully");
  };

  const downloadReport = (id) => {
    window.open(`http://127.0.0.1:8000/reports/download/${id}`, "_blank");
  };

  return (
    <div className="space-y-8 text-white">
      <div className="flex flex-col justify-between gap-5 rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl md:flex-row md:items-center">
        <div className="flex items-center gap-5">
          <div className="rounded-3xl bg-linear-to-br from-pink-500 to-indigo-600 p-5 shadow-xl">
            <FileText size={46} />
          </div>

          <div>
            <h1 className="text-4xl font-black">Reports & Insights</h1>
            <p className="mt-1 text-lg text-slate-400">
              Generate AI business insights and downloadable analytics summaries
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-linear-to-r from-indigo-600 to-pink-500 px-6 py-4 text-lg font-black shadow-xl">
          AI Generated Reports
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl xl:col-span-2">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-2xl bg-indigo-600/20 p-4 text-indigo-300">
              <Sparkles size={34} />
            </div>
            <div>
              <h2 className="text-2xl font-black">Generate New Report</h2>
              <p className="text-slate-400">
                Create PDF or Excel analytics report with AI insights
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-lg font-bold">
                Report Title
              </label>
              <input
                type="text"
                placeholder="Example: Monthly Forecast Report"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                required
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-lg outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-lg font-bold">
                Report Type
              </label>
              <select
                value={form.report_type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    report_type: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-lg outline-none focus:border-indigo-500"
              >
                <option value="pdf">PDF Report</option>
                <option value="excel">Excel Report</option>
              </select>
            </div>

            <button
              type="submit"
              className="md:col-span-2 flex items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-indigo-600 to-pink-500 px-6 py-4 text-xl font-black shadow-xl"
            >
              <FileDown size={30} />
              Generate Report
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl">
          <h2 className="mb-6 text-2xl font-black">Report Features</h2>

          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-900 p-5">
              <div className="mb-2 flex items-center gap-3 text-pink-400">
                <Brain size={28} />
                <h3 className="text-xl font-black">AI Insights</h3>
              </div>
              <p className="text-slate-400">
                Smart business summary generated from latest forecasts.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 p-5">
              <div className="mb-2 flex items-center gap-3 text-emerald-400">
                <FileSpreadsheet size={28} />
                <h3 className="text-xl font-black">Excel Export</h3>
              </div>
              <p className="text-slate-400">
                Download structured analytics summaries as Excel files.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 p-5">
              <div className="mb-2 flex items-center gap-3 text-indigo-400">
                <FileText size={28} />
                <h3 className="text-xl font-black">PDF Report</h3>
              </div>
              <p className="text-slate-400">
                Generate shareable PDF reports for forecasting results.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl">
        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-2xl bg-purple-600/20 p-4 text-purple-300">
            <FileText size={34} />
          </div>
          <div>
            <h2 className="text-2xl font-black">Generated Reports</h2>
            <p className="text-slate-400">
              View and download all generated analytics reports
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full min-w-225 text-left text-lg">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-5">#</th>
                <th className="p-5">Title</th>
                <th className="p-5">Type</th>
                <th className="p-5">AI Summary</th>
                <th className="p-5">Download</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report, index) => (
                <tr key={report.id} className="border-t border-slate-800">
                  <td className="p-5 font-bold">{index + 1}</td>

                  <td className="p-5 font-bold">{report.title}</td>

                  <td className="p-5">
                    <span
                      className={`rounded-xl px-4 py-2 text-sm font-black ${
                        report.report_type === "excel"
                          ? "bg-emerald-600"
                          : "bg-indigo-600"
                      }`}
                    >
                      {report.report_type.toUpperCase()}
                    </span>
                  </td>

                  <td className="max-w-125 p-5 text-slate-300">
                    {report.summary}
                  </td>

                  <td className="p-5">
                    <button
                      onClick={() => downloadReport(report.id)}
                      className="flex items-center gap-2 rounded-xl bg-pink-600 px-4 py-3 font-black"
                    >
                      <Download size={22} />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {reports.length === 0 && (
          <p className="mt-6 text-center text-lg text-slate-400">
            No reports generated yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Reports;