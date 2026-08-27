import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import CustomerLayout from "./layouts/CustomerLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// AUTH PAGES
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// 🎬 ADMIN PAGES (IMPORT CÁC FILE SẴN CÓ CỦA BẠN)
import Dashboard from "./pages/admin/Dashboard";
import Movies from "./pages/admin/Movies";
import Users from "./pages/admin/Users";
import Showtimes from "./pages/admin/Showtimes";
import Theaters from "./pages/admin/Theaters";
import Tickets from "./pages/admin/Tickets";
import Revenue from "./pages/admin/Revenue";
import Reports from "./pages/admin/Reports";
import Notifications from "./pages/admin/Notifications";

// CUSTOMER PAGES
import Home from "./pages/customer/Home";
import SearchMovie from "./pages/customer/SearchMovie";
import MovieDetail from "./pages/customer/MovieDetail";
import Showtime from "./pages/customer/Showtime";
import Booking from "./pages/customer/Booking";
import Payment from "./pages/customer/Payment";
import Success from "./pages/customer/Success";
import Favorites from "./pages/customer/Favorites";
import MyTickets from "./pages/customer/MyTickets";
import Profile from "./pages/customer/Profile";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* 1. AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 2. ADMIN ROUTES (Đã đấu nối tất cả các trang Admin) */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/movies" element={<Movies />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/showtimes" element={<Showtimes />} />
        <Route path="/admin/theaters" element={<Theaters />} />
        <Route path="/admin/tickets" element={<Tickets />} />
        <Route path="/admin/revenue" element={<Revenue />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/notifications" element={<Notifications />} />

        {/* 3. MANAGER ROUTE (Tạm thời) */}
        <Route
          path="/manager"
          element={
            <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-6 text-white">
              <h1 className="text-3xl font-bold text-blue-500">📊 TRANG QUẢN LÝ (MANAGER)</h1>
              <p className="mt-2 text-slate-400">Đã đăng nhập bằng tài khoản Manager</p>
              <a href="/" className="mt-4 text-blue-400 underline">Về trang chủ</a>
            </div>
          }
        />

        {/* 4. CUSTOMER ROUTES */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchMovie />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/showtime" element={<Showtime />} />
          <Route path="/booking/:movieId" element={<Booking />} />
          <Route path="/payment/:movieId" element={<Payment />} />
          <Route path="/success/:movieId" element={<Success />} />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-tickets"
            element={
              <ProtectedRoute>
                <MyTickets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;