import { Link, NavLink } from "react-router-dom";
import UserHeader from "./UserHeader"; // Import phần quản lý User & Đổi tài khoản

function Header() {
  const navClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-blue-400 font-semibold"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* 1. LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-white transition hover:opacity-90"
        >
          Movie<span className="text-blue-500">Box</span>
        </Link>

        {/* 2. NAVIGATION */}
        <nav className="hidden items-center gap-7 md:flex">
          <NavLink to="/" className={navClass}>
            Trang chủ
          </NavLink>

          <NavLink to="/search" className={navClass}>
            Phim
          </NavLink>

          <NavLink to="/favorites" className={navClass}>
            Yêu thích
          </NavLink>

          <NavLink to="/my-tickets" className={navClass}>
            Vé của tôi
          </NavLink>
        </nav>

        {/* 3. USER HEADER (Tự động chuyển đổi giữa Đăng nhập/Đăng ký và Avatar Lý Nam Anh) */}
        <UserHeader />

      </div>
    </header>
  );
}

export default Header;