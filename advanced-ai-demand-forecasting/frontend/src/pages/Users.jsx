import { useEffect, useState } from "react";
import {
  Users as UsersIcon,
  ShieldCheck,
  UserCheck,
  UserX,
  Trash2,
  Crown,
  Eye,
} from "lucide-react";
import API from "../api/api";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data || []);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id, role) => {
    await API.put(`/users/${id}`, { role });
    fetchUsers();
  };

  const toggleStatus = async (user) => {
    await API.put(`/users/${user.id}`, {
      is_active: !user.is_active,
    });

    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    await API.delete(`/users/${id}`);
    fetchUsers();
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.is_active).length;
  const admins = users.filter((u) => u.role === "Super Admin").length;

  return (
    <div className="space-y-8 text-white">
      <div className="flex flex-col justify-between gap-5 rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl md:flex-row md:items-center">
        <div className="flex items-center gap-5">
          <div className="rounded-3xl bg-linear-to-br from-blue-500 to-purple-600 p-5 shadow-xl">
            <UsersIcon size={46} />
          </div>

          <div>
            <h1 className="text-4xl font-black">User Management</h1>
            <p className="mt-1 text-lg text-slate-400">
              Manage users, roles and account access permissions
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-linear-to-r from-indigo-600 to-pink-500 px-6 py-4 text-lg font-black shadow-xl">
          Role Based Access
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-slate-400">Total Users</p>
              <h2 className="mt-2 text-4xl font-black">{totalUsers}</h2>
            </div>
            <div className="rounded-2xl bg-blue-600/20 p-4 text-blue-400">
              <UsersIcon size={34} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-slate-400">Active Users</p>
              <h2 className="mt-2 text-4xl font-black">{activeUsers}</h2>
            </div>
            <div className="rounded-2xl bg-emerald-600/20 p-4 text-emerald-400">
              <UserCheck size={34} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-slate-400">Super Admins</p>
              <h2 className="mt-2 text-4xl font-black">{admins}</h2>
            </div>
            <div className="rounded-2xl bg-yellow-600/20 p-4 text-yellow-400">
              <Crown size={34} />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl">
        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-2xl bg-purple-600/20 p-4 text-purple-300">
            <ShieldCheck size={34} />
          </div>
          <div>
            <h2 className="text-2xl font-black">Users & Permissions</h2>
            <p className="text-slate-400">
              Update roles, enable or disable accounts and remove users
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full min-w-250 text-left text-lg">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-5">#</th>
                <th className="p-5">User</th>
                <th className="p-5">Email</th>
                <th className="p-5">Role</th>
                <th className="p-5">Status</th>
                <th className="p-5">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="border-t border-slate-800">
                  <td className="p-5 font-bold">{index + 1}</td>

                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-pink-500 font-black">
                        {user.full_name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black">{user.full_name}</p>
                        <p className="text-sm text-slate-400">User ID: {user.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-5 text-slate-300">{user.email}</td>

                  <td className="p-5">
                    <select
                      value={user.role}
                      onChange={(e) => updateRole(user.id, e.target.value)}
                      className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 font-bold outline-none"
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Analyst">Analyst</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </td>

                  <td className="p-5">
                    <span
                      className={`rounded-xl px-4 py-2 text-sm font-black ${
                        user.is_active ? "bg-emerald-600" : "bg-red-600"
                      }`}
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex gap-3">
                      <button className="rounded-xl bg-blue-600 p-3">
                        <Eye size={24} />
                      </button>

                      <button
                        onClick={() => toggleStatus(user)}
                        className={`rounded-xl p-3 ${
                          user.is_active ? "bg-yellow-500" : "bg-emerald-600"
                        }`}
                      >
                        {user.is_active ? <UserX size={24} /> : <UserCheck size={24} />}
                      </button>

                      <button
                        onClick={() => deleteUser(user.id)}
                        className="rounded-xl bg-red-600 p-3"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <p className="mt-6 text-center text-lg text-slate-400">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Users;