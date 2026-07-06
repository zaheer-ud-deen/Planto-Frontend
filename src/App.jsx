import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import PlantType from "./pages/PlantType";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardMain from "./pages/dashboard/DashboardMain";
import Products from "./pages/dashboard/Products";
import Orders from "./pages/dashboard/Orders";
import Users from "./pages/dashboard/Users";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";
import AdminRoute from "./components/AdminRoute";
import ChatBot from "./components/ChatBot";
import NotFound from "./pages/NotFound";
import IndoorPlants from "./pages/IndoorPlants";
import OutdoorPlants from "./pages/OutdoorPlants";
import SucculentsPlants from "./pages/SucculentsPlants";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderSuccess from "./pages/OrderSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

// Layout component WITH NavBar (for protected pages)
function LayoutWithNavBar() {
  return (
    <>
    <Toaster position="top-right" />
      <NavBar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Public Routes (No login required) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes (Login required) */}
          <Route element={<LayoutWithNavBar />}>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/plant-type" element={
              <ProtectedRoute>
                <PlantType />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/order-success" element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            } />
            <Route path="/order-confirmation/:id" element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            } />
            <Route path="/IndoorPlants" element={
              <ProtectedRoute>
                <IndoorPlants />
              </ProtectedRoute>
            } />
            <Route path="/OutdoorPlants" element={
              <ProtectedRoute>
                <OutdoorPlants />
              </ProtectedRoute>
            } />
            <Route path="/SucculentsPlants" element={
              <ProtectedRoute>
                <SucculentsPlants />
              </ProtectedRoute>
            } />
          </Route>

          {/* Dashboard Routes (Admin only) */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardMain />} />
            <Route path="products" element={
              <AdminRoute>
                <Products />
              </AdminRoute>
            } />
            <Route path="orders" element={
              <AdminRoute>
                <Orders />
              </AdminRoute>
            } />
            <Route path="users" element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            } />
            <Route path="analytics" element={
              <AdminRoute>
                <Analytics />
              </AdminRoute>
            } />
            <Route path="settings" element={
              <AdminRoute>
                <Settings />
              </AdminRoute>
            } />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatBot />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;