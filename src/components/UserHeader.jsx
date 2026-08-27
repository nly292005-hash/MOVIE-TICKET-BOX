import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../context/useAuth"; // 👈 Đã đổi từ AuthContext sang useAuth

function UserHeader() {
  const { currentUser, logout } = useAuth(); // Lấy dữ liệu thực tế từ AuthContext
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center gap-3">
      {/* NẾU CHƯA ĐĂNG NHẬP */}
      {!currentUser ? (
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm font-semibold text-white transition hover:border-slate-500 hover:bg-slate-800"
          >
            Đăng nhập
          </button>

          <button
            onClick={() => navigate("/register")}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Đăng ký
          </button>
        </div>
      ) : (
        /* ĐÃ ĐĂNG NHẬP */
        <div className="relative">
          <button
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            className="flex items-center gap-2.5 rounded-full bg-slate-900/80 p-1.5 pr-3 text-white transition hover:bg-slate-800"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300">
              <User className="h-4 w-4" />
            </div>

            <span className="text-sm font-medium">{currentUser.name}</span>

            <span className="rounded-md bg-slate-200 px-2.5 py-1 text-[11px] font-bold tracking-wide text-slate-900">
              {currentUser.role}
            </span>

            <ChevronDown
              className={`h-4 w-4 text-slate-400 transition-transform ${
                isOpenMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* MENU DROPDOWN */}
          {isOpenMenu && (
            <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-2xl z-50">
              <div className="border-b border-slate-800 pb-2 px-2">
                <p className="text-xs text-slate-400">Đang đăng nhập:</p>
                <p className="text-sm font-bold text-white truncate">
                  {currentUser.email}
                </p>
              </div>

              <div className="border-t border-slate-800 pt-2 space-y-1">
                <Link
                  to="/favorites"
                  onClick={() => setIsOpenMenu(false)}
                  className="block px-3 py-2 text-xs text-slate-300 hover:bg-slate-900 rounded-lg"
                >
                  Phim yêu thích của tôi
                </Link>
                <Link
                  to="/my-tickets"
                  onClick={() => setIsOpenMenu(false)}
                  className="block px-3 py-2 text-xs text-slate-300 hover:bg-slate-900 rounded-lg"
                >
                  Vé đã đặt của tôi
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpenMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-lg transition"
                >
                  <LogOut className="h-3.5 w-3.5" /> Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserHeader;