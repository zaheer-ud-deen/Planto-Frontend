// src/pages/dashboard/Users.jsx
import { useState, useEffect } from "react";
import { 
  FiSearch, FiEye, FiTrash2, FiX, FiFilter, 
  FiUsers, FiUserCheck, FiUserX, FiShield, FiMail, FiCalendar
} from "react-icons/fi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    adminUsers: 0
  });

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/users/stats/summary", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const updateUserRole = async (id, role) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/users/${id}/role`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });
      const data = await response.json();
      if (data.success) {
        fetchUsers();
        fetchStats();
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const updateUserStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/users/${id}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await response.json();
      if (data.success) {
        fetchUsers();
        fetchStats();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone!")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) {
          fetchUsers();
          fetchStats();
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const roleOptions = ["All", "admin", "customer"];
  const statusOptions = ["All", "active", "blocked"];

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return 'bg-green-500/20 text-green-300 border-green-500/30';
    }
    return 'bg-red-500/20 text-red-300 border-red-500/30';
  };

  const getRoleBadge = (role) => {
    if (role === 'admin') {
      return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    }
    return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-black">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
        <p className="text-white/50">Manage all registered users and their permissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
            </div>
            <FiUsers className="text-green-400 text-3xl" />
          </div>
        </div>
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-green-400">{stats.activeUsers}</p>
            </div>
            <FiUserCheck className="text-green-400 text-3xl" />
          </div>
        </div>
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-sm">Blocked Users</p>
              <p className="text-2xl font-bold text-red-400">{stats.blockedUsers}</p>
            </div>
            <FiUserX className="text-red-400 text-3xl" />
          </div>
        </div>
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-sm">Admin Users</p>
              <p className="text-2xl font-bold text-purple-400">{stats.adminUsers}</p>
            </div>
            <FiShield className="text-purple-400 text-3xl" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search by username or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#1a2a1a] border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="relative">
          <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="pl-11 pr-8 py-3 bg-[#1a2a1a] border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500 cursor-pointer"
          >
            {roleOptions.map(role => (
              <option key={role} value={role}>Role: {role === "All" ? "All" : role === "admin" ? "Admin" : "Customer"}</option>
            ))}
          </select>
        </div>
        <div className="relative">
          <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-11 pr-8 py-3 bg-[#1a2a1a] border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500 cursor-pointer"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>Status: {status === "All" ? "All" : status === "active" ? "Active" : "Blocked"}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">User</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">Email</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">Role</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">Status</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">Joined</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-t border-white/10 hover:bg-white/5 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                        {user.username?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white/80 text-sm font-medium">{user.username}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-white/60 text-sm">{user.email}</td>
                  <td className="py-4 px-6">
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer ${getRoleBadge(user.role)}`}
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-4 px-6">
                    <select
                      value={user.status}
                      onChange={(e) => updateUserStatus(user._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer ${getStatusBadge(user.status)}`}
                    >
                      <option value="active">Active</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-white/50 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
  <div className="flex gap-3">
    <button 
      onClick={() => {
        setSelectedUser(user);
        setShowModal(true);
      }}
      className="text-blue-400 hover:text-blue-300 cursor-pointer"
      title="View Details"
    >
      <FiEye />
    </button>
    {currentUser?._id !== user._id && (
      <button 
        onClick={() => deleteUser(user._id)}
        className="text-red-400 hover:text-red-300 cursor-pointer"
        title="Delete User"
      >
        <FiTrash2 />
      </button>
    )}
  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center text-white/50 py-12">No users found</div>
        )}
      </div>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2a1a] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">User Details</h2>
              <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white cursor-pointer">
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white text-3xl font-bold">
                  {selectedUser.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{selectedUser.username}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(selectedUser.role)}`}>
                      {selectedUser.role === 'admin' ? 'Admin' : 'Customer'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedUser.status)}`}>
                      {selectedUser.status === 'active' ? 'Active' : 'Blocked'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/50 text-sm flex items-center gap-2">
                    <FiMail /> Email
                  </p>
                  <p className="text-white">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm flex items-center gap-2">
                    <FiCalendar /> Joined Date
                  </p>
                  <p className="text-white">{new Date(selectedUser.createdAt).toLocaleString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-white/50 text-sm">User ID</p>
                  <p className="text-white/60 text-sm break-all">{selectedUser._id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;