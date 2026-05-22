import { useEffect, useState } from "react";
import { Database, UploadCloud, Eye, Pencil, Trash2 } from "lucide-react";
import API from "../api/api";

const Datasets = () => {
  const [datasets, setDatasets] = useState([]);

  const [form, setForm] = useState({
    name: "",
    product_category: "",
    region: "",
    file: null,
  });

  const fetchDatasets = async () => {
    const res = await API.get("/datasets");
    setDatasets(res.data.data || []);
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setForm({ ...form, file: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("product_category", form.product_category);
    formData.append("region", form.region);
    formData.append("file", form.file);

    await API.post("/datasets/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setForm({
      name: "",
      product_category: "",
      region: "",
      file: null,
    });

    fetchDatasets();
  };

  return (
    <div className="space-y-8 text-white">
      <div className="flex flex-col justify-between gap-5 rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl md:flex-row md:items-center">
        <div className="flex items-center gap-5">
          <div className="rounded-3xl bg-linear-to-br from-violet-500 to-indigo-600 p-5 shadow-xl">
            <Database size={44} />
          </div>
          <div>
            <h1 className="text-4xl font-black">Dataset Management</h1>
            <p className="mt-1 text-lg text-slate-400">
              Upload, manage and explore your forecasting datasets
            </p>
          </div>
        </div>

        <button
          onClick={() => document.getElementById("dataset-file").click()}
          className="flex items-center gap-3 rounded-2xl bg-linear-to-r from-indigo-600 to-pink-500 px-6 py-4 text-lg font-black shadow-xl"
        >
          <UploadCloud size={28} />
          Upload Dataset
        </button>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl">
        <h2 className="mb-6 text-2xl font-black">Upload New Dataset</h2>

        <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-lg font-bold">Dataset Name</label>
            <input
              name="name"
              placeholder="Enter dataset name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-lg outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-lg font-bold">Product Category</label>
            <input
              name="product_category"
              placeholder="Example: laptop"
              value={form.product_category}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-lg outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-lg font-bold">Region</label>
            <input
              name="region"
              placeholder="Example: south"
              value={form.region}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-lg outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-lg font-bold">Dataset File</label>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900 p-6 text-center hover:border-indigo-500">
              <UploadCloud size={46} className="mb-2 text-indigo-400" />
              <span className="text-lg font-black">
                {form.file ? form.file.name : "Choose File"}
              </span>
              <span className="text-sm text-slate-400">CSV or Excel only</span>
              <input
                id="dataset-file"
                type="file"
                name="file"
                accept=".csv,.xlsx"
                onChange={handleChange}
                required
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            className="xl:col-span-4 flex items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-indigo-600 to-pink-500 px-6 py-4 text-xl font-black shadow-xl"
          >
            <UploadCloud size={30} />
            Upload Dataset
          </button>
        </form>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl">
        <h2 className="mb-6 text-2xl font-black">Dataset List</h2>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full min-w-225 text-left">
            <thead className="bg-slate-800 text-lg">
              <tr>
                <th className="p-5">#</th>
                <th className="p-5">Name</th>
                <th className="p-5">Category</th>
                <th className="p-5">Region</th>
                <th className="p-5">Records</th>
                <th className="p-5">Sales</th>
                <th className="p-5">Revenue</th>
                <th className="p-5">Actions</th>
              </tr>
            </thead>

            <tbody>
              {datasets.map((dataset, index) => (
                <tr key={dataset.id} className="border-t border-slate-800 text-lg">
                  <td className="p-5">{index + 1}</td>
                  <td className="p-5 font-bold">{dataset.name}</td>
                  <td className="p-5">
                    <span className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-black">
                      {dataset.product_category}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-black">
                      {dataset.region}
                    </span>
                  </td>
                  <td className="p-5">{dataset.total_records}</td>
                  <td className="p-5">{dataset.total_sales}</td>
                  <td className="p-5">₹{dataset.total_revenue}</td>
                  <td className="p-5">
                    <div className="flex gap-3">
                      <button className="rounded-xl bg-blue-600 p-3">
                        <Eye size={24} />
                      </button>
                      <button className="rounded-xl bg-yellow-500 p-3">
                        <Pencil size={24} />
                      </button>
                      <button className="rounded-xl bg-red-600 p-3">
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {datasets.length === 0 && (
          <p className="mt-6 text-center text-lg text-slate-400">
            No datasets uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Datasets;