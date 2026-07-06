// src/pages/dashboard/Settings.jsx
import { useState, useEffect } from "react";
import { FiCamera } from "react-icons/fi";
import { 
  FiUser, FiLock, FiBell, FiShoppingBag, FiCreditCard, FiKey, 
  FiSave, FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle, FiCopy
} from "react-icons/fi";
import toast, { Toaster } from 'react-hot-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Profile form
  const [profileData, setProfileData] = useState({
    username: "",
    email: ""
  });
  
  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  // Notifications
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotionalEmails: false,
    productAlerts: true
  });
  
  // Store settings (admin only)
  const [storeSettings, setStoreSettings] = useState({
    storeName: "Planto",
    storeEmail: "hello@planto.com",
    storePhone: "+1 234 567 890",
    storeAddress: "123 Plant Street, Garden City",
    currency: "USD"
  });
  
  // API Keys (admin only)
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Production Key", key: "pk_live_xxxxx", createdAt: "2024-01-15" },
    { id: 2, name: "Test Key", key: "pk_test_xxxxx", createdAt: "2024-01-15" }
  ]);
  const [showApiKey, setShowApiKey] = useState({});

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
    setProfileData({
      username: userData.username || "",
      email: userData.email || ""
    });
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://planto-backend-production.up.railway.app/api/users/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Profile updated successfully!");
        const updatedUser = { ...user, username: profileData.username, email: profileData.email };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };
  
  const handleProfileImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  setUploading(true);
  const formData = new FormData();
  formData.append("profileImage", file);
  
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`https://planto-backend-production.up.railway.app/api/users/${user.id}/profile-image`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    
    const data = await response.json();
    if (data.success) {
      const updatedUser = { ...user, profileImage: data.user.profileImage };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success("Profile image updated!");
    }
  } catch (error) {
    toast.error("Failed to upload image");
  } finally {
    setUploading(false);
  }
}; 

  const handlePasswordUpdate = async (e) => {
  e.preventDefault();
  
  // Validation
  if (!passwordData.currentPassword) {
    toast.error("Please enter your current password");
    return;
  }
  if (passwordData.newPassword.length < 6) {
    toast.error("New password must be at least 6 characters");
    return;
  }
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    toast.error("New passwords do not match");
    return;
  }
  
  setLoading(true);
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    const response = await fetch(`https://planto-backend-production.up.railway.app/api/users/${user.id}/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      toast.success("Password updated successfully! Please login again.");
      // Clear stored credentials and redirect to login
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/login";
      }, 2000);
    } else {
      toast.error(data.message || "Password update failed");
    }
  } catch (error) {
    toast.error("Server error. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const generateApiKey = () => {
    const newKey = `pk_live_${Math.random().toString(36).substring(2, 15)}`;
    setApiKeys([...apiKeys, { 
      id: Date.now(), 
      name: `API Key ${apiKeys.length + 1}`, 
      key: newKey, 
      createdAt: new Date().toISOString().split('T')[0] 
    }]);
    toast.success("New API key generated!");
  };

  const deleteApiKey = (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast.success("API key deleted!");
  };

  const tabs = [
    { id: "profile", name: "Profile", icon: FiUser, adminOnly: false },
    { id: "security", name: "Security", icon: FiLock, adminOnly: false },
    { id: "notifications", name: "Notifications", icon: FiBell, adminOnly: false },
    // { id: "store", name: "Store Settings", icon: FiShoppingBag, adminOnly: true },
    { id: "billing", name: "Billing", icon: FiCreditCard, adminOnly: true },
    { id: "api", name: "API Keys", icon: FiKey, adminOnly: true }
  ];

  const visibleTabs = tabs.filter(tab => !tab.adminOnly || isAdmin);

  return (
    <div className="p-6 bg-black">
      {/* <Toaster position="top-right" /> */}
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/50">Manage your account and store preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <tab.icon size={18} />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>
          <div className="flex items-center gap-6 mb-6">
  <div className="relative">
    <img 
      src={user?.profileImage ? `https://planto-backend-production.up.railway.app${user.profileImage}` : "https://ui-avatars.com/api/?name=" + (user?.username || "Admin") + "&background=22c55e&color=fff"} 
      alt="Profile"
      className="w-20 h-20 rounded-full object-cover border-2 border-green-500"
    />
    <label className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 cursor-pointer hover:bg-green-600">
      <FiCamera className="text-white text-sm" />
      <input 
        type="file" 
        accept="image/*"
        className="hidden"
        onChange={handleProfileImageUpload}
        disabled={uploading}
      />
    </label>
  </div>
  <div>
    <h3 className="text-white font-semibold">Profile Photo</h3>
    <p className="text-white/50 text-sm">{uploading ? "Uploading..." : "Click camera icon to upload"}</p>
  </div>
</div>
          
          <form onSubmit={handleProfileUpdate} className="space-y-5 max-w-md">
            <div>
              <label className="block text-white/70 text-sm mb-2">Username</label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-white/70 text-sm mb-2">Email Address</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-white/70 text-sm mb-2">Role</label>
              <input
                type="text"
                value={user?.role === "admin" ? "Administrator" : "Customer"}
                disabled
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white/60 cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-white/70 text-sm mb-2">Member Since</label>
              <input
                type="text"
                value={new Date().toLocaleDateString()}
                disabled
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white/60 cursor-not-allowed"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white hover:shadow-lg transition cursor-pointer"
            >
              <FiSave /> {loading ? "Saving..." : "Update Profile"}
            </button>
          </form>
        </div>
      )}

      {/* Security Tab */}
      {/* Security Tab */}
{activeTab === "security" && (
  <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-6">
    <h2 className="text-xl font-semibold text-white mb-6">Change Password</h2>
    
    <form onSubmit={handlePasswordUpdate} className="space-y-5 max-w-md">
      <div>
        <label className="block text-white/70 text-sm mb-2">Current Password</label>
        <div className="relative">
          <input
            type={showPassword.current ? "text" : "password"}
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            className="w-full px-4 py-2 pr-10 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
          >
            {showPassword.current ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-white/70 text-sm mb-2">New Password</label>
        <div className="relative">
          <input
            type={showPassword.new ? "text" : "password"}
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            className="w-full px-4 py-2 pr-10 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
          >
            {showPassword.new ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-white/70 text-sm mb-2">Confirm New Password</label>
        <div className="relative">
          <input
            type={showPassword.confirm ? "text" : "password"}
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            className="w-full px-4 py-2 pr-10 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
          >
            {showPassword.confirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white hover:shadow-lg transition cursor-pointer disabled:opacity-50"
      >
        <FiSave /> {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  </div>
)}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Notification Preferences</h2>
          
          <div className="space-y-4 max-w-md">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="text-white font-medium">Order Updates</p>
                <p className="text-white/50 text-sm">Receive notifications about your orders</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, orderUpdates: !notifications.orderUpdates })}
                className={`w-12 h-6 rounded-full transition-all ${
                  notifications.orderUpdates ? "bg-green-500" : "bg-white/20"
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transform transition-all ${
                  notifications.orderUpdates ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="text-white font-medium">Promotional Emails</p>
                <p className="text-white/50 text-sm">Receive offers and discounts</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, promotionalEmails: !notifications.promotionalEmails })}
                className={`w-12 h-6 rounded-full transition-all ${
                  notifications.promotionalEmails ? "bg-green-500" : "bg-white/20"
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transform transition-all ${
                  notifications.promotionalEmails ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="text-white font-medium">Product Alerts</p>
                <p className="text-white/50 text-sm">Get notified about stock updates</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, productAlerts: !notifications.productAlerts })}
                className={`w-12 h-6 rounded-full transition-all ${
                  notifications.productAlerts ? "bg-green-500" : "bg-white/20"
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transform transition-all ${
                  notifications.productAlerts ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </div>
          </div>
          
          <button className="mt-6 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white hover:shadow-lg transition cursor-pointer">
            Save Preferences
          </button>
        </div>
      )}

      {/* Store Settings Tab (Admin Only) */}
      {/* {activeTab === "store" && isAdmin && (
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Store Information</h2>
          
          <div className="space-y-5 max-w-md">
            <div>
              <label className="block text-white/70 text-sm mb-2">Store Name</label>
              <input
                type="text"
                value={storeSettings.storeName}
                onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500"
              />
            </div>
            
            <div>
              <label className="block text-white/70 text-sm mb-2">Store Email</label>
              <input
                type="email"
                value={storeSettings.storeEmail}
                onChange={(e) => setStoreSettings({ ...storeSettings, storeEmail: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500"
              />
            </div>
            
            <div>
              <label className="block text-white/70 text-sm mb-2">Store Phone</label>
              <input
                type="text"
                value={storeSettings.storePhone}
                onChange={(e) => setStoreSettings({ ...storeSettings, storePhone: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500"
              />
            </div>
            
            <div>
              <label className="block text-white/70 text-sm mb-2">Store Address</label>
              <textarea
                value={storeSettings.storeAddress}
                onChange={(e) => setStoreSettings({ ...storeSettings, storeAddress: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500"
                rows="3"
              />
            </div>
            
            <div>
              <label className="block text-white/70 text-sm mb-2">Currency</label>
              <select
                value={storeSettings.currency}
                onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500"
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>PKR</option>
              </select>
            </div>
            
            <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white hover:shadow-lg transition cursor-pointer">
              Save Store Settings
            </button>
          </div>
        </div>
      )} */}

      {/* API Keys Tab (Admin Only) */}
      {activeTab === "api" && isAdmin && (
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">API Keys</h2>
            <button
              onClick={generateApiKey}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white text-sm hover:shadow-lg transition cursor-pointer"
            >
              + Generate New Key
            </button>
          </div>
          
          <div className="space-y-3">
            {apiKeys.map((key) => (
              <div key={key.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <p className="text-white font-medium">{key.name}</p>
                  <p className="text-white/40 text-sm">Created: {key.createdAt}</p>
                </div>
                <div className="flex items-center gap-2">
                  <code className="px-3 py-1 bg-black/30 rounded-lg text-green-400 text-sm">
                    {showApiKey[key.id] ? key.key : "••••••••••••••••"}
                  </code>
                  <button
                    onClick={() => setShowApiKey({ ...showApiKey, [key.id]: !showApiKey[key.id] })}
                    className="text-white/50 hover:text-white"
                  >
                    {showApiKey[key.id] ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(key.key)}
                    className="text-white/50 hover:text-green-400"
                  >
                    <FiCopy size={18} />
                  </button>
                  <button
                    onClick={() => deleteApiKey(key.id)}
                    className="text-white/50 hover:text-red-400"
                  >
                    <FiAlertCircle size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <p className="text-yellow-400 text-sm">⚠️ Keep your API keys secure. Never share them publicly.</p>
          </div>
        </div>
      )}

      {/* Billing Tab (Admin Only - Placeholder) */}
      {activeTab === "billing" && isAdmin && (
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-6 text-center">
          <FiCreditCard className="text-white/40 text-5xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Billing</h2>
          <p className="text-white/50">Payment methods and invoices will appear here.</p>
          <button className="mt-4 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white hover:shadow-lg transition cursor-pointer">
            Add Payment Method
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;    