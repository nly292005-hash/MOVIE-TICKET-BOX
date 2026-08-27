import { Link, useLocation } from "react-router-dom";

function Sidebar({ role = "admin" }) {
  const location = useLocation();

  const adminItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "▦",
    },
    {
      name: "Quản lý phim",
      path: "/admin/movies",
      icon: "🎬",
    },
    {
      name: "Quản lý rạp",
      path: "/admin/theaters",
      icon: "🏢",
    },
    {
      name: "Lịch chiếu",
      path: "/admin/showtimes",
      icon: "🕐",
    },
    {
      name: "Quản lý vé",
      path: "/admin/tickets",
      icon: "🎟",
    },
    {
      name: "Người dùng",
      path: "/admin/users",
      icon: "👥",
    },
    {
      name: "Thông báo",
      path: "/admin/notifications",
      icon: "🔔",
    },
    {
      name: "Báo cáo",
      path: "/admin/reports",
      icon: "📊",
    },
    {
      name: "Doanh thu",
      path: "/admin/revenue",
      icon: "💰",
    },
  ];

  const managerItems = [
    {
      name: "Dashboard",
      path: "/manager",
      icon: "▦",
    },
    {
      name: "Quản lý phim",
      path: "/manager/movies",
      icon: "🎬",
    },
    {
      name: "Lịch chiếu",
      path: "/manager/showtimes",
      icon: "🕐",
    },
    {
      name: "Quản lý vé",
      path: "/manager/tickets",
      icon: "🎟",
    },
    {
      name: "Phòng chiếu",
      path: "/manager/screens",
      icon: "📽",
    },
    {
      name: "Chỗ ngồi",
      path: "/manager/seats",
      icon: "💺",
    },
    {
      name: "Khuyến mãi",
      path: "/manager/promotions",
      icon: "🏷",
    },
    {
      name: "Đánh giá",
      path: "/manager/reviews",
      icon: "⭐",
    },
    {
      name: "Nhân viên",
      path: "/manager/staff",
      icon: "👥",
    },
  ];

  const menuItems =
    role === "admin"
      ? adminItems
      : managerItems;

  const roleName =
    role === "admin"
      ? "Administrator"
      : "Theater Manager";

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-900">

      {/* LOGO */}
      <div className="flex h-20 items-center border-b border-slate-800 px-6">

        <Link
          to={role === "admin" ? "/admin" : "/manager"}
          className="text-2xl font-extrabold"
        >
          MOVIE
          <span className="text-red-500">
            BOX
          </span>
        </Link>

      </div>

      {/* ROLE */}
      <div className="mx-4 mt-5 rounded-xl bg-red-500/10 px-4 py-3">

        <p className="text-xs text-slate-500">
          ROLE
        </p>

        <p className="mt-1 font-semibold text-red-500">
          {roleName}
        </p>

      </div>

      {/* MENU */}
      <nav className="mt-6 flex-1 overflow-y-auto px-4">

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {role === "admin"
            ? "Quản lý hệ thống"
            : "Quản lý rạp"}
        </p>

        <div className="space-y-1">

          {menuItems.map((item) => {

            const isActive =
              item.path ===
              (role === "admin"
                ? "/admin"
                : "/manager")
                ? location.pathname === item.path
                : location.pathname.startsWith(
                    item.path
                  );

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-red-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >

                <span className="w-6 text-center">
                  {item.icon}
                </span>

                <span>
                  {item.name}
                </span>

              </Link>
            );
          })}

        </div>

      </nav>

      {/* BOTTOM */}
      <div className="border-t border-slate-800 p-4">

        <Link
          to="/"
          className="mb-2 flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          ←
          <span>
            Trang khách hàng
          </span>
        </Link>

        <Link
          to="/login"
          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
        >
          ⇥
          <span>
            Đăng xuất
          </span>
        </Link>

      </div>

    </aside>
  );
}

export default Sidebar;