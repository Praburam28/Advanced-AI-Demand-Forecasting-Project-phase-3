import { useEffect, useState } from "react";
import {
  Activity,
  Cpu,
  HardDrive,
  Clock,
  Users,
  RefreshCcw,
  History,
  Server,
} from "lucide-react";
import API from "../api/api";

const Monitoring = () => {
  const [logs, setLogs] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [history, setHistory] = useState([]);

  const fetchMonitoringData = async () => {
    const logsRes = await API.get("/monitoring/activity-logs");
    const metricsRes = await API.get("/monitoring/system-metrics");
    const historyRes = await API.get("/monitoring/forecasting-history");

    setLogs(logsRes.data || []);
    setMetrics(metricsRes.data || []);
    setHistory(historyRes.data || []);
  };

  const captureMetrics = async () => {
    await API.post("/monitoring/capture-metrics");
    fetchMonitoringData();
  };

  useEffect(() => {
    fetchMonitoringData();
  }, []);

  const latestMetric = metrics[0];

  return (
    <div className="space-y-8 text-white">
      <div className="flex flex-col justify-between gap-5 rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl md:flex-row md:items-center">
        <div className="flex items-center gap-5">
          <div className="rounded-3xl bg-linear-to-br from-emerald-500 to-cyan-600 p-5 shadow-xl">
            <Activity size={46} />
          </div>

          <div>
            <h1 className="text-4xl font-black">System Monitoring</h1>
            <p className="mt-1 text-lg text-slate-400">
              Track API activity, user logs, forecasting history and performance
            </p>
          </div>
        </div>

        <button
          onClick={captureMetrics}
          className="flex items-center gap-3 rounded-2xl bg-linear-to-r from-indigo-600 to-pink-500 px-6 py-4 text-lg font-black shadow-xl"
        >
          <RefreshCcw size={28} />
          Capture Metrics
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-slate-400">CPU Usage</p>
              <h2 className="mt-2 text-4xl font-black">
                {latestMetric?.cpu_usage || 0}%
              </h2>
            </div>
            <div className="rounded-2xl bg-emerald-600/20 p-4 text-emerald-400">
              <Cpu size={34} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-slate-400">Memory Usage</p>
              <h2 className="mt-2 text-4xl font-black">
                {latestMetric?.memory_usage || 0}%
              </h2>
            </div>
            <div className="rounded-2xl bg-yellow-600/20 p-4 text-yellow-400">
              <HardDrive size={34} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-slate-400">Response Time</p>
              <h2 className="mt-2 text-4xl font-black">
                {latestMetric?.api_response_time || 0} ms
              </h2>
            </div>
            <div className="rounded-2xl bg-blue-600/20 p-4 text-blue-400">
              <Clock size={34} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-slate-400">Active Users</p>
              <h2 className="mt-2 text-4xl font-black">
                {latestMetric?.active_users || 0}
              </h2>
            </div>
            <div className="rounded-2xl bg-purple-600/20 p-4 text-purple-400">
              <Users size={34} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-2xl bg-cyan-600/20 p-4 text-cyan-300">
              <Server size={34} />
            </div>
            <div>
              <h2 className="text-2xl font-black">System Metrics</h2>
              <p className="text-slate-400">Latest server performance records</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full min-w-175 text-left text-lg">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-5">CPU</th>
                  <th className="p-5">Memory</th>
                  <th className="p-5">Response</th>
                  <th className="p-5">Users</th>
                </tr>
              </thead>

              <tbody>
                {metrics.map((metric) => (
                  <tr key={metric.id} className="border-t border-slate-800">
                    <td className="p-5">{metric.cpu_usage}%</td>
                    <td className="p-5">{metric.memory_usage}%</td>
                    <td className="p-5">{metric.api_response_time} ms</td>
                    <td className="p-5">{metric.active_users}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-2xl bg-purple-600/20 p-4 text-purple-300">
              <History size={34} />
            </div>
            <div>
              <h2 className="text-2xl font-black">Forecasting History</h2>
              <p className="text-slate-400">Recent AI forecast records</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full min-w-175 text-left text-lg">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-5">Dataset</th>
                  <th className="p-5">Model</th>
                  <th className="p-5">Demand</th>
                  <th className="p-5">Accuracy</th>
                </tr>
              </thead>

              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border-t border-slate-800">
                    <td className="p-5">{item.dataset_id}</td>
                    <td className="p-5">{item.model_name}</td>
                    <td className="p-5">{item.predicted_demand}</td>
                    <td className="p-5">{item.accuracy_score}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl">
        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-2xl bg-pink-600/20 p-4 text-pink-300">
            <Activity size={34} />
          </div>
          <div>
            <h2 className="text-2xl font-black">Activity Logs</h2>
            <p className="text-slate-400">API and user activity tracking</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full min-w-250 text-left text-lg">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-5">User ID</th>
                <th className="p-5">Activity</th>
                <th className="p-5">Description</th>
                <th className="p-5">Endpoint</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-t border-slate-800">
                  <td className="p-5">{log.user_id}</td>
                  <td className="p-5">
                    <span className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-black">
                      {log.activity_type}
                    </span>
                  </td>
                  <td className="p-5 text-slate-300">{log.description}</td>
                  <td className="p-5 text-cyan-300">{log.endpoint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {logs.length === 0 && (
          <p className="mt-6 text-center text-lg text-slate-400">
            No activity logs available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Monitoring;