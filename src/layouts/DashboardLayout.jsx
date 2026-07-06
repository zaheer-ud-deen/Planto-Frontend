import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { 
  FiGrid, FiPackage, FiShoppingBag, FiUsers, FiBarChart2, FiSettings, 
  FiLogOut
} from "react-icons/fi";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", icon: FiGrid, path: "/dashboard", adminOnly: false },
    { name: "Products", icon: FiPackage, path: "/dashboard/products", adminOnly: true },
    { name: "Orders", icon: FiShoppingBag, path: "/dashboard/orders", adminOnly: true },
    { name: "Users", icon: FiUsers, path: "/dashboard/users", adminOnly: true },
    { name: "Analytics", icon: FiBarChart2, path: "/dashboard/analytics", adminOnly: true },
    { name: "Settings", icon: FiSettings, path: "/dashboard/settings", adminOnly: false },
  ];

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user.role === "admin";

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#172218] to-[#0f1810]">
      {/* Sidebar - Fixed */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white/[0.04] backdrop-blur-sm border-r border-white/10 z-50">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-8">Planto.</h1>
          
          <nav className="space-y-2">
            {navItems.map((item) => {
              if (item.adminOnly && !isAdmin) return null;
              
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all group"
                >
                  <item.icon className="text-lg" />
                  <span className="text-sm">{item.name}</span>
                </button>
              );
            })}
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-27 rounded-xl text-red-400 hover:text-red-300 cursor-pointer  transition-all mt-8"
            >
              <FiLogOut className="text-lg pt-120px" />
              <span className="text-sm pt-120px">Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area - This changes when you click menu items */}
      <main className="ml-64 flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;