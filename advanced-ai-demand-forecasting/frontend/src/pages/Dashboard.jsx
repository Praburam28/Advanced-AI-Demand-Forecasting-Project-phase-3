import { useEffect, useState } from "react";
import { Database, LineChart, IndianRupee, Target } from "lucide-react";
import {
  LineChart as ReLineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { getLiveDashboard } from "../api/analyticsApi";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import LoadingSkeleton from "../components/LoadingSkeleton";

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

const legendStyle = {
  color: "#fff",
  fontSize: 15,
  fontWeight: 700,
};

const Dashboard = () => {
  const [data, setData] = useState(null);

  const fetchDashboard = async () => {
    const res = await getLiveDashboard();
    setData(res.data);
  };

  useEffect(() => {
    fetchDashboard();

    const interval = setInterval(() => {
      fetchDashboard();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return <LoadingSkeleton />;
  }

  const summary = data.summary;

  return (
    <div className="space-y-8 text-white">
      <div className="rounded-3xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 p-9 shadow-2xl">
        <h1 className="text-4xl font-black">
          Advanced AI Demand Forecasting
        </h1>
        <p className="mt-2 text-lg text-indigo-100">
          Real-time forecasting, analytics, revenue prediction and inventory risk
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Datasets"
          value={summary.total_datasets}
          icon={<Database size={30} />}
        />

        <StatCard
          title="Total Forecasts"
          value={summary.total_forecasts}
          icon={<LineChart size={30} />}
        />

        <StatCard
          title="Total Revenue"
          value={`₹${summary.total_revenue}`}
          icon={<IndianRupee size={30} />}
        />

        <StatCard
          title="Avg Accuracy"
          value={`${summary.average_accuracy}%`}
          icon={<Target size={30} />}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 2xl:grid-cols-2">
        <ChartCard title="Region-wise Sales & Revenue Trend">
          <ResponsiveContainer width="100%" height={430}>
            <ReLineChart
              data={data.region_analytics}
              margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#334155" />

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

              <Legend wrapperStyle={legendStyle} />

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
                activeDot={{ r: 11 }}
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
                activeDot={{ r: 11 }}
              />
            </ReLineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Category-wise Revenue Trend">
          <ResponsiveContainer width="100%" height={430}>
            <AreaChart
              data={data.category_analytics}
              margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient
                  id="colorRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#10b981"
                    stopOpacity={0.85}
                  />
                  <stop
                    offset="95%"
                    stopColor="#10b981"
                    stopOpacity={0.08}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="4 4" stroke="#334155" />

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

              <Legend wrapperStyle={legendStyle} />

              <Area
                type="monotone"
                dataKey="total_revenue"
                name="Total Revenue"
                stroke="#10b981"
                fill="url(#colorRevenue)"
                strokeWidth={5}
                dot={{
                  r: 8,
                  fill: "#10b981",
                  strokeWidth: 3,
                  stroke: "#020617",
                }}
                activeDot={{ r: 11 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-8 2xl:grid-cols-2">
        <ChartCard title="Revenue Prediction Trend">
          <ResponsiveContainer width="100%" height={430}>
            <ReLineChart
              data={data.revenue_prediction}
              margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#334155" />

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

              <Legend wrapperStyle={legendStyle} />

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
                activeDot={{ r: 11 }}
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
                activeDot={{ r: 11 }}
              />
            </ReLineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Inventory Risk">
          <div className="overflow-hidden rounded-2xl border border-slate-700">
            <table className="w-full text-lg">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-5 text-left">Risk Type</th>
                  <th className="p-5 text-left">Count</th>
                </tr>
              </thead>

              <tbody>
                {data.inventory_risk.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-700"
                  >
                    <td className="p-5 font-bold">{item.risk_type}</td>
                    <td className="p-5">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default Dashboard;