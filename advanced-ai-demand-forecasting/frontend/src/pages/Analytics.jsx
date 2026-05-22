import { useEffect, useState } from "react";
import {
  TrendingUp,
  BarChart3,
  Activity,
  Globe,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";

import API from "../api/api";

const axisStyle = {
  fill: "#cbd5e1",
  fontSize: 15,
  fontWeight: 700,
};

const tooltipStyle = {
  backgroundColor: "#020617",
  border: "1px solid #334155",
  borderRadius: "14px",
  color: "#fff",
};

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async () => {
    const res = await API.get("/analytics/live-dashboard");
    setAnalytics(res.data);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!analytics) {
    return (
      <div className="text-center text-xl text-white">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="space-y-8 text-white">
      <div className="rounded-3xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 shadow-2xl">
        <div className="flex items-center gap-5">
          <div className="rounded-3xl bg-white/20 p-5">
            <BarChart3 size={48} />
          </div>

          <div>
            <h1 className="text-4xl font-black">
              Advanced Analytics
            </h1>

            <p className="mt-2 text-lg text-indigo-100">
              Region-wise forecasting, category insights,
              revenue prediction and inventory risk
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-slate-400">Regions</p>
              <h2 className="mt-2 text-4xl font-black">
                {analytics.region_analytics.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-blue-600/20 p-4 text-blue-400">
              <Globe size={34} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-slate-400">Categories</p>
              <h2 className="mt-2 text-4xl font-black">
                {analytics.category_analytics.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-purple-600/20 p-4 text-purple-400">
              <BarChart3 size={34} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-slate-400">Forecast Trends</p>
              <h2 className="mt-2 text-4xl font-black">
                {analytics.revenue_prediction.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-emerald-600/20 p-4 text-emerald-400">
              <TrendingUp size={34} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-slate-400">Inventory Risks</p>
              <h2 className="mt-2 text-4xl font-black">
                {analytics.inventory_risk.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-pink-600/20 p-4 text-pink-400">
              <Activity size={34} />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-8 shadow-2xl">
        <h2 className="mb-6 text-3xl font-black">
          Region-wise Forecasting Analytics
        </h2>

        <ResponsiveContainer width="100%" height={450}>
          <LineChart
            data={analytics.region_analytics}
            margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#334155"
            />

            <XAxis
              dataKey="name"
              tick={axisStyle}
              axisLine={{ stroke: "#64748b" }}
            />

            <YAxis
              tick={axisStyle}
              axisLine={{ stroke: "#64748b" }}
            />

            <Tooltip contentStyle={tooltipStyle} />

            <Legend />

            <Line
              type="monotone"
              dataKey="total_sales"
              name="Total Sales"
              stroke="#38bdf8"
              strokeWidth={5}
              dot={{
                r: 8,
                fill: "#38bdf8",
                strokeWidth: 3,
                stroke: "#020617",
              }}
            />

            <Line
              type="monotone"
              dataKey="total_revenue"
              name="Total Revenue"
              stroke="#f472b6"
              strokeWidth={5}
              dot={{
                r: 8,
                fill: "#f472b6",
                strokeWidth: 3,
                stroke: "#020617",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-8 shadow-2xl">
        <h2 className="mb-6 text-3xl font-black">
          Category-wise Sales Insights
        </h2>

        <ResponsiveContainer width="100%" height={450}>
          <AreaChart
            data={analytics.category_analytics}
            margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#8b5cf6"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#8b5cf6"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#334155"
            />

            <XAxis
              dataKey="name"
              tick={axisStyle}
              axisLine={{ stroke: "#64748b" }}
            />

            <YAxis
              tick={axisStyle}
              axisLine={{ stroke: "#64748b" }}
            />

            <Tooltip contentStyle={tooltipStyle} />

            <Legend />

            <Area
              type="monotone"
              dataKey="total_revenue"
              name="Revenue"
              stroke="#8b5cf6"
              fill="url(#revenueGradient)"
              strokeWidth={5}
              dot={{
                r: 8,
                fill: "#8b5cf6",
                strokeWidth: 3,
                stroke: "#020617",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-8 shadow-2xl">
        <h2 className="mb-6 text-3xl font-black">
          Revenue Prediction Trend
        </h2>

        <ResponsiveContainer width="100%" height={450}>
          <LineChart
            data={analytics.revenue_prediction}
            margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#334155"
            />

            <XAxis
              dataKey="forecast_id"
              tick={axisStyle}
              axisLine={{ stroke: "#64748b" }}
            />

            <YAxis
              tick={axisStyle}
              axisLine={{ stroke: "#64748b" }}
            />

            <Tooltip contentStyle={tooltipStyle} />

            <Legend />

            <Line
              type="monotone"
              dataKey="predicted_revenue"
              name="Predicted Revenue"
              stroke="#facc15"
              strokeWidth={5}
              dot={{
                r: 8,
                fill: "#facc15",
                strokeWidth: 3,
                stroke: "#020617",
              }}
            />

            <Line
              type="monotone"
              dataKey="predicted_demand"
              name="Predicted Demand"
              stroke="#22d3ee"
              strokeWidth={5}
              dot={{
                r: 8,
                fill: "#22d3ee",
                strokeWidth: 3,
                stroke: "#020617",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;