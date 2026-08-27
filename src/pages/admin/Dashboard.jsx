import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  // 1. CHỈ SỐ TỔNG QUAN
  const stats = [
    {
      title: "Tổng doanh thu",
      value: "125.8M đ",
      change: "+12.5%",
      icon: "💰",
      link: "/admin/revenue",
      color: "from-green-500/10 to-emerald-500/5 text-green-500",
    },
    {
      title: "Vé đã bán",
      value: "8,426",
      change: "+8.2%",
      icon: "🎟️",
      link: "/admin/tickets",
      color: "from-blue-500/10 to-indigo-500/5 text-blue-500",
    },
    {
      title: "Phim đang chiếu",
      value: "24",
      change: "+4 phim mới",
      icon: "🎬",
      link: "/admin/movies",
      color: "from-purple-500/10 to-pink-500/5 text-purple-500",
    },
    {
      title: "Tài khoản người dùng",
      value: "12,840",
      change: "+15.4%",
      icon: "👥",
      link: "/admin/users",
      color: "from-amber-500/10 to-orange-500/5 text-amber-500",
    },
  ];

  // 2. DANH MỤC QUẢN LÝ TOÀN QUYỀN (Ghép đầy đủ 9 trang chức năng theo hình)
  const adminModules = [
    {
      title: "Quản lý Phim",
      desc: "Thêm/sửa/xóa phim, poster, trailer, thể loại & diễn viên",
      icon: "🎬",
      link: "/admin/movies",
      tag: "Movie",
    },
    {
      title: "Quản lý Rạp & Phòng",
      desc: "Cụm rạp, số lượng phòng chiếu, loại màn hình",
      icon: "🏢",
      link: "/admin/theaters",
      tag: "Theater",
    },
    {
      title: "Suất chiếu & Giá vé",
      desc: "Xếp lịch chiếu phim, cài đặt giá vé theo khung giờ",
      icon: "🕐",
      link: "/admin/showtimes",
      tag: "Showtime",
    },
    {
      title: "Đơn vé & Hoàn tiền",
      desc: "Xem giao dịch, xử lý yêu cầu hủy / hoàn vé",
      icon: "🎟️",
      link: "/admin/tickets",
      tag: "Ticket",
    },
    {
      title: "Quản lý Tài khoản",
      desc: "Phân quyền Manager, Quản lý Khách hàng & Nhân viên",
      icon: "👥",
      link: "/admin/users",
      tag: "User",
    },
    {
      title: "Doanh thu & Tài chính",
      desc: "Thống kê doanh thu chi tiết theo rạp, phim, phương thức",
      icon: "💵",
      link: "/admin/revenue",
      tag: "Revenue",
    },
    {
      title: "Báo cáo Hệ thống",
      desc: "Xuất báo cáo hoạt động, tăng trưởng & hiệu suất",
      icon: "📊",
      link: "/admin/reports",
      tag: "Report",
    },
    {
      title: "Gửi Thông báo",
      desc: "Tạo và gửi thông báo hệ thống, khuyến mãi cho khách",
      icon: "🔔",
      link: "/admin/notifications",
      tag: "Notification",
    },
    {
      title: "Cấu hình Website",
      desc: "Cấu hình chung, cổng thanh toán, hotline, giao diện",
      icon: "⚙️",
      link: "/admin/settings",
      tag: "Setting",
    },
  ];

  // 3. DANH SÁCH ĐƠN VẾ GẦN ĐÂY
  const recentTickets = [
    {
      id: "#TK00125",
      customer: "Nguyễn Văn An",
      movie: "Avengers: End Game",
      theater: "CGV Vincom Center",
      amount: "180.000đ",
      status: "Đã thanh toán",
    },
    {
      id: "#TK00124",
      customer: "Trần Minh Anh",
      movie: "Spider-Man: No Way Home",
      theater: "Lotte Cinema Landmark",
      amount: "150.000đ",
      status: "Đã thanh toán",
    },
    {
      id: "#TK00123",
      customer: "Lê Hoàng Nam",
      movie: "Interstellar",
      theater: "Galaxy Nguyễn Du",
      amount: "200.000đ",
      status: "Đã hủy / Hoàn vé",
    },
    {
      id: "#TK00122",
      customer: "Phạm Minh Đức",
      movie: "The Batman",
      theater: "CGV Aeon Mall",
      amount: "160.000đ",
      status: "Chờ thanh toán",
    },
  ];

  return (
    <div className="space-y-8 text-slate-100">
      {/* HEADER TỔNG QUAN */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Hệ thống quản trị toàn quyền MovieBox - Quản lý phim, rạp, tài khoản & doanh thu.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Hệ thống đang hoạt động
          </span>
        </div>
      </div>

      {/* 1. KHU VỰC THỐNG KÊ NHANH (STATS CARDS) */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            to={stat.link}
            className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-5 transition-all hover:border-slate-700 hover:shadow-lg hover:shadow-red-500/5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                <h2 className="mt-2 text-3xl font-extrabold text-white">
                  {stat.value}
                </h2>
                <p className="mt-2 text-xs font-semibold text-green-400">
                  {stat.change}
                </p>
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-2xl border border-slate-700/50 group-hover:scale-110 transition-transform`}
              >
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 2. KHU VỰC CHỨC NĂNG QUẢN LÝ ADMIN (DANH MỤC TRUNG TÂM) */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Chức năng Quản trị</h2>
            <p className="mt-1 text-sm text-slate-400">
              Truy cập nhanh tất cả các mô-đun quản lý hệ thống
            </p>
          </div>
          <span className="rounded-md bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400 border border-slate-700">
            9 Chức năng
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {adminModules.map((module) => (
            <Link
              key={module.title}
              to={module.link}
              className="group flex items-start gap-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 transition-all hover:border-red-500/50 hover:bg-slate-800/60"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-2xl group-hover:bg-red-500/10 group-hover:text-red-400 transition-colors border border-slate-700/50">
                {module.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-200 group-hover:text-red-400 transition-colors truncate">
                    {module.title}
                  </p>
                  <span className="text-[10px] uppercase font-bold text-slate-500 group-hover:text-slate-400">
                    {module.tag}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {module.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. BIỂU ĐỒ DOANH THU & ĐƠN VÉ MỚI NHẤT */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* BIỂU ĐỒ DOANH THU (XL: COL 2) */}
        <div className="xl:col-span-2 rounded-xl border border-slate-800 bg-slate-900 p-6 flex flex-col justify-between">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Doanh thu gần đây</h2>
              <p className="mt-1 text-sm text-slate-400">
                Thống kê doanh thu bán vé 7 ngày qua
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 outline-none focus:border-red-500">
                <option>7 ngày gần nhất</option>
                <option>30 ngày gần nhất</option>
                <option>Tháng này</option>
              </select>
              <Link
                to="/admin/revenue"
                className="text-xs font-semibold text-red-500 hover:text-red-400"
              >
                Chi tiết →
              </Link>
            </div>
          </div>

          {/* CỘT BIỂU ĐỒ MINH HỌA */}
          <div className="flex h-64 items-end gap-3 border-b border-slate-800 pb-2">
            {[45, 65, 50, 85, 60, 95, 75].map((height, index) => (
              <div
                key={index}
                className="group flex flex-1 flex-col items-center justify-end h-full"
              >
                <div className="text-[10px] font-semibold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                  {height * 2}M
                </div>
                <div
                  style={{ height: `${height}%` }}
                  className="w-full max-w-[40px] rounded-t-md bg-gradient-to-t from-red-600 to-red-500 transition-all group-hover:from-red-500 group-hover:to-orange-400"
                />
                <span className="mt-3 text-xs text-slate-500 font-medium">
                  Thứ {index + 2 === 8 ? "CN" : index + 2}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* THÔNG BÁO & LƯU Ý HỆ THỐNG */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Thông báo nhanh</h2>
              <Link
                to="/admin/notifications"
                className="text-xs text-red-500 hover:text-red-400 font-semibold"
              >
                Tạo mới +
              </Link>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg bg-slate-800/60 p-3 border border-slate-700/50">
                <p className="text-xs font-semibold text-amber-400">⚠️ Yêu cầu hủy vé</p>
                <p className="text-xs text-slate-300 mt-1">
                  Có 3 đơn vé đang chờ xác nhận hoàn tiền từ khách hàng.
                </p>
              </div>
              <div className="rounded-lg bg-slate-800/60 p-3 border border-slate-700/50">
                <p className="text-xs font-semibold text-blue-400">🎬 Phim mới thêm</p>
                <p className="text-xs text-slate-300 mt-1">
                  Manager vừa yêu cầu bổ sung lịch chiếu cho "Dune 2".
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-800 pt-4">
            <Link
              to="/admin/settings"
              className="flex items-center justify-between text-xs text-slate-400 hover:text-white"
            >
              <span>⚙️ Kiểm tra cấu hình hệ thống</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. BẢNG DANH SÁCH VÉ GẦN ĐÂY */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <div>
            <h2 className="text-lg font-bold text-white">Giao dịch đặt vé mới nhất</h2>
            <p className="mt-1 text-sm text-slate-400">
              Quản lý và xử lý trực tiếp đơn vé hệ thống
            </p>
          </div>
          <Link
            to="/admin/tickets"
            className="text-sm font-semibold text-red-500 hover:text-red-400"
          >
            Quản lý tất cả vé →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-slate-800 bg-slate-950/80 text-xs text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Mã vé</th>
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Phim</th>
                <th className="px-6 py-4">Rạp</th>
                <th className="px-6 py-4">Số tiền</th>
                <th className="px-6 py-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {recentTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-mono font-semibold text-slate-200">
                    {ticket.id}
                  </td>
                  <td className="px-6 py-4 text-slate-300 font-medium">
                    {ticket.customer}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{ticket.movie}</td>
                  <td className="px-6 py-4 text-slate-400">{ticket.theater}</td>
                  <td className="px-6 py-4 font-semibold text-white">
                    {ticket.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${
                        ticket.status === "Đã thanh toán"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : ticket.status === "Chờ thanh toán"
                          ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;