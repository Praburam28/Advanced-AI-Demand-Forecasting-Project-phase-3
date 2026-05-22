import { useEffect, useState } from "react";
import {
  Brain,
  GitCompare,
  RefreshCcw,
  LineChart,
  Sparkles,
  TrendingUp,
  IndianRupee,
  ShieldAlert,
} from "lucide-react";
import API from "../api/api";

const Forecasting = () => {
  const [datasets, setDatasets] = useState([]);
  const [forecasts, setForecasts] = useState([]);
  const [datasetId, setDatasetId] = useState("");
  const [modelName, setModelName] = useState("Ensemble Model");
  const [comparison, setComparison] = useState(null);

  const fetchDatasets = async () => {
    const res = await API.get("/datasets");
    setDatasets(res.data.data || []);
  };

  const fetchForecasts = async () => {
    const res = await API.get("/forecasts");
    setForecasts(res.data || []);
  };

  useEffect(() => {
    fetchDatasets();
    fetchForecasts();
  }, []);

  const generateForecast = async (e) => {
    e.preventDefault();

    await API.post("/forecasts/generate", {
      dataset_id: Number(datasetId),
      model_name: modelName,
    });

    fetchForecasts();
    alert("Forecast generated successfully");
  };

  const compareModels = async () => {
    if (!datasetId) {
      alert("Please select dataset first");
      return;
    }

    const res = await API.get(`/ai/compare-models?dataset_id=${datasetId}`);
    setComparison(res.data);
  };

  const retrainModel = async () => {
    const res = await API.post("/ai/retrain");
    alert(`Model retrained. New accuracy: ${res.data.new_accuracy}%`);
  };

  return (
    <div className="space-y-8 text-white">
      <div className="flex flex-col justify-between gap-5 rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl md:flex-row md:items-center">
        <div className="flex items-center gap-5">
          <div className="rounded-3xl bg-linear-to-br from-indigo-500 to-pink-500 p-5 shadow-xl">
            <Brain size={46} />
          </div>

          <div>
            <h1 className="text-4xl font-black">AI Forecasting</h1>
            <p className="mt-1 text-lg text-slate-400">
              Generate forecasts, compare models and retrain AI models
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-linear-to-r from-indigo-600 to-pink-500 px-6 py-4 text-lg font-black shadow-xl">
          Real-Time Forecasting
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl xl:col-span-2">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-2xl bg-indigo-600/20 p-4 text-indigo-300">
              <Sparkles size={34} />
            </div>
            <div>
              <h2 className="text-2xl font-black">Generate Forecast</h2>
              <p className="text-slate-400">
                Select dataset and forecasting model
              </p>
            </div>
          </div>

          <form onSubmit={generateForecast} className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-lg font-bold">
                Select Dataset
              </label>
              <select
                value={datasetId}
                onChange={(e) => setDatasetId(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-lg outline-none focus:border-indigo-500"
              >
                <option value="">Choose dataset</option>
                {datasets.map((dataset) => (
                  <option key={dataset.id} value={dataset.id}>
                    {dataset.name} - {dataset.region}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-lg font-bold">
                Forecast Model
              </label>
              <select
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-lg outline-none focus:border-indigo-500"
              >
                <option value="Linear Regression">Linear Regression</option>
                <option value="Random Forest">Random Forest</option>
                <option value="Gradient Boosting">Gradient Boosting</option>
                <option value="Ensemble Model">Ensemble Model</option>
              </select>
            </div>

            <button
              type="submit"
              className="md:col-span-2 flex items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-indigo-600 to-pink-500 px-6 py-4 text-xl font-black shadow-xl"
            >
              <LineChart size={30} />
              Generate Forecast
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl">
          <h2 className="mb-6 text-2xl font-black">AI Actions</h2>

          <div className="space-y-4">
            <button
              onClick={compareModels}
              className="flex w-full items-center gap-4 rounded-2xl bg-blue-600 px-5 py-4 text-lg font-black shadow-lg"
            >
              <GitCompare size={30} />
              Compare Models
            </button>

            <button
              onClick={retrainModel}
              className="flex w-full items-center gap-4 rounded-2xl bg-emerald-600 px-5 py-4 text-lg font-black shadow-lg"
            >
              <RefreshCcw size={30} />
              Retrain Model
            </button>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-900 p-5">
            <p className="text-lg font-black">Model Status</p>
            <p className="mt-2 text-slate-400">
              Ensemble model active with anomaly detection and seasonal trend analysis.
            </p>
          </div>
        </div>
      </div>

      {comparison && (
        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl">
          <h2 className="mb-6 text-2xl font-black">
            Model Comparison - {comparison.dataset_name}
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full min-w-175 text-left text-lg">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-5">Model</th>
                  <th className="p-5">Accuracy</th>
                  <th className="p-5">Predicted Demand</th>
                </tr>
              </thead>
              <tbody>
                {comparison.comparison.map((item, index) => (
                  <tr key={index} className="border-t border-slate-800">
                    <td className="p-5 font-bold">{item.model_name}</td>
                    <td className="p-5">{item.accuracy}%</td>
                    <td className="p-5">{item.predicted_demand}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl">
        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-2xl bg-purple-600/20 p-4 text-purple-300">
            <TrendingUp size={34} />
          </div>
          <div>
            <h2 className="text-2xl font-black">Forecast History</h2>
            <p className="text-slate-400">
              View all generated AI forecasting outputs
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full min-w-250 text-left text-lg">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-5">Dataset ID</th>
                <th className="p-5">Model</th>
                <th className="p-5">Demand</th>
                <th className="p-5">Revenue</th>
                <th className="p-5">Accuracy</th>
                <th className="p-5">Inventory Risk</th>
              </tr>
            </thead>

            <tbody>
              {forecasts.map((forecast) => (
                <tr key={forecast.id} className="border-t border-slate-800">
                  <td className="p-5 font-bold">{forecast.dataset_id}</td>

                  <td className="p-5">
                    <span className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-black">
                      {forecast.model_name}
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={22} className="text-cyan-400" />
                      {forecast.predicted_demand}
                    </div>
                  </td>

                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <IndianRupee size={22} className="text-emerald-400" />
                      {forecast.predicted_revenue}
                    </div>
                  </td>

                  <td className="p-5">
                    <span className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black">
                      {forecast.accuracy_score}%
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <ShieldAlert size={22} className="text-yellow-400" />
                      {forecast.inventory_risk}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {forecasts.length === 0 && (
          <p className="mt-6 text-center text-lg text-slate-400">
            No forecasts generated yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Forecasting;