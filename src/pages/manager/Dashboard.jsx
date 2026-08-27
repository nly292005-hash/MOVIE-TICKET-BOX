import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign,
  Ticket,
  Clock,
  Armchair,
  Tag,
  QrCode,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Film,
  Calendar,
  Building2,
  Percent,
  RefreshCw,
  Star,
  MessageSquare,
  Eye,
  EyeOff,
  Gift,
  Zap,
} from "lucide-react";

// 🎬 IMPORT DANH SÁCH PHIM
import { movies } from "../../data/movies";

function Dashboard() {
  const [selectedMovieId, setSelectedMovieId] = useState("all");

  // State giả lập xử lý kiểm duyệt đánh giá (Cho trang Reviews.jsx)
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      user: "Lê Hoàng Nam",
      movie: movies[0]?.title || "Mai",
      rating: 1,
      comment: "CẢNH BÁO SPOIL: Cuối phim nhân vật chính sẽ chọn...",
      status: "pending",
      isSpoil: true,
    },
    {
      id: 2,
      user: "Nguyễn Văn An",
      movie: movies[1]?.title || "Dune 2",
      rating: 5,
      comment: "Phim quá đỉnh, trải nghiệm đặt vé mượt mà!",
      status: "published",
      isSpoil: false,
    },
  ]);

  // 1. THỐNG KÊ TỔNG QUAN PLATFORM
  const stats = [
    {
      title: "Tổng GMV Hôm nay",
      value: "142.5M",
      subtext: "+18.4% so với hôm qua",
      icon: <DollarSign className="h-5 w-5 text-emerald-400" />,
      bgIcon: "bg-emerald-500/10",
    },
    {
      title: "Vé bán ra hôm nay",
      value: "1,420 Vé",
      subtext: "Tỷ lệ lấp đầy rạp: 68.5%",
      icon: <Ticket className="h-5 w-5 text-blue-400" />,
      bgIcon: "bg-blue-500/10",
    },
    {
      title: "Hoa hồng nền tảng (Est)",
      value: "7.12M",
      subtext: "Chiết khấu trung bình ~5%",
      icon: <Percent className="h-5 w-5 text-amber-400" />,
      bgIcon: "bg-amber-500/10",
    },
    {
      title: "Cụm rạp đang kết nối",
      value: "12 / 12",
      subtext: "API đồng bộ trực tiếp 100%",
      icon: <Building2 className="h-5 w-5 text-purple-400" />,
      bgIcon: "bg-purple-500/10",
    },
  ];

  // 2. LỐI TẮT QUẢN LÝ (KHỚP CHÍNH XÁC CÁC FILE TRONG FOLDER MANAGER)
  const shortcuts = [
    { label: "Quản lý Phim", path: "/manager/movies", icon: <Film className="h-5 w-5 text-red-500" /> },
    { label: "Cụm rạp & Phòng", path: "/manager/screens", icon: <Building2 className="h-5 w-5 text-blue-500" /> },
    { label: "Suất chiếu", path: "/manager/showtimes", icon: <Clock className="h-5 w-5 text-amber-500" /> },
    { label: "Sơ đồ ghế", path: "/manager/seats", icon: <Armchair className="h-5 w-5 text-emerald-500" /> },
    { label: "Quản lý Vé", path: "/manager/tickets", icon: <Ticket className="h-5 w-5 text-purple-500" /> },
    { label: "Khuyến mãi", path: "/manager/promotions", icon: <Tag className="h-5 w-5 text-pink-500" /> },
    { label: "Đánh giá", path: "/manager/reviews", icon: <MessageSquare className="h-5 w-5 text-indigo-400" /> },
  ];

  // 3. LỌC PHIM
  const filteredMovies =
    selectedMovieId === "all"
      ? movies
      : movies.filter((m) => m.id === selectedMovieId);

  // 4. KHUYẾN MÃI ĐANG BÁN (Cho Promotions.jsx)
  const activePromotions = [
    { code: "WEEKEND20", name: "Giảm 20% Cuối tuần", used: 342, max: 500 },
    { code: "STUDENT10", name: "Ưu đãi Học sinh SV", used: 890, max: 1000 },
  ];

  // 5. NHẬT KÝ HOẠT ĐỘNG THỜI GIAN THỰC
  const activities = [
    {
      id: 1,
      type: "warning",
      text: "Kết nối API suất chiếu CGV Landmark 81 phản hồi chậm (>2000ms)",
      time: "8 phút trước",
      icon: <AlertTriangle className="h-4 w-4 text-amber-400" />,
    },
    {
      id: 2,
      type: "success",
      text: `Vé #TK-9821 (2 vé - "${movies[0]?.title || 'Phim'}") thanh toán VNPay thành công`,
      time: "12 phút trước",
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
    },
  ];

  // Thao tác ẩn/hiện đánh giá nhanh
  const handleToggleHideReview = (id) => {
    setReviewsList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "hidden" ? "published" : "hidden" }
          : item
      )
    );
  };

  return (
    <div className="space-y-8 bg-[#0a0d18] text-white min-h-screen p-6">

      {/* HEADER & THAO TÁC NHANH */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Admin Dashboard</h1>
          <p className="mt-1 text-slate-400 text-sm">
            Tổng quan hoạt động bán vé, doanh thu đối tác và hệ thống vận hành.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/manager/tickets"
            className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition"
          >
            <QrCode className="h-4 w-4 text-emerald-400" /> Tra cứu Vé / Đơn hàng
          </Link>
          <Link
            to="/manager/showtimes"
            className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/30 hover:bg-red-700 transition"
          >
            <RefreshCw className="h-4 w-4" /> Đồng bộ suất chiếu
          </Link>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-800 bg-[#121726] p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-400">{stat.title}</span>
              <div className={`rounded-xl p-2.5 ${stat.bgIcon}`}>
                {stat.icon}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="mt-1.5 text-xs text-slate-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-400" />
                {stat.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* SHORTCUTS - KHUP TRÒN 7 TÍNH NĂNG THEO FILE DỰ ÁN */}
      <div>
        <h2 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
          Lối tắt quản lý hệ thống
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {shortcuts.map((sc) => (
            <Link
              key={sc.label}
              to={sc.path}
              className="flex flex-col items-center justify-center text-center gap-2 rounded-xl border border-slate-800 bg-[#121726] p-3.5 hover:border-slate-700 hover:bg-slate-800/60 transition group"
            >
              <div className="rounded-lg bg-slate-900 p-2 group-hover:scale-110 transition">
                {sc.icon}
              </div>
              <span className="text-xs font-semibold text-slate-200">{sc.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* GRID CHÍNH: SUẤT CHIẾU (TRÁI) - WIDGETS KIỂM DUYỆT & KHUYẾN MÃI (PHẢI) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* CỘT TÌNH TRẠNG SUẤT CHIẾU (COL-SPAN-2) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-[#121726] p-6 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Film className="h-5 w-5 text-red-500" /> Tình trạng Suất chiếu & Ghế ngồi
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Đồng bộ trực tiếp từ các cụm rạp đối tác
              </p>
            </div>

            <Link
              to="/manager/showtimes"
              className="text-xs font-semibold text-red-500 hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              Cấu hình lịch chiếu <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Bộ lọc Phim */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
            <button
              onClick={() => setSelectedMovieId("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedMovieId === "all"
                  ? "bg-red-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              Tất cả phim ({movies.length})
            </button>
            {movies.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMovieId(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedMovieId === m.id
                    ? "bg-red-600 text-white"
                    : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                {m.title}
              </button>
            ))}
          </div>

          {/* Danh sách các phim */}
          <div className="space-y-4">
            {filteredMovies.map((movie, index) => {
              const partnerName = ["Beta Thanh Xuân", "CGV Vincom Bà Triệu", "BHD Bitexco", "CGV Landmark 81"][index % 4];
              
              return (
                <div
                  key={movie.id}
                  className="rounded-xl bg-slate-900/60 p-4 border border-slate-800/80 space-y-3"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="h-12 w-9 object-cover rounded border border-slate-800"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-slate-100">{movie.title}</h3>
                          <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-1.5 py-0.2 rounded font-medium">
                            {movie.ageRating}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {partnerName} • {movie.duration} phút • <span className="text-amber-400">★ {movie.rating}</span>
                        </p>
                      </div>
                    </div>

                    <span className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                      {movie.showtimes ? movie.showtimes.length : 0} Suất chiếu
                    </span>
                  </div>

                  {/* Badge Suất chiếu */}
                  <div className="pt-2 border-t border-slate-800/60">
                    <p className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-red-400" /> Giờ chiếu hôm nay:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {movie.showtimes?.map((time, tIdx) => {
                        const bookedSeats = [82, 104, 56, 118][tIdx % 4] || 70;
                        const totalSeats = 120;
                        const percent = Math.round((bookedSeats / totalSeats) * 100);

                        return (
                          <div
                            key={tIdx}
                            className="group relative flex flex-col items-center justify-center bg-[#121726] border border-slate-800 hover:border-red-500/60 rounded-lg px-3 py-1.5 cursor-pointer transition"
                          >
                            <span className="text-xs font-bold text-red-400 group-hover:text-red-300">
                              {time}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">
                              {bookedSeats}/{totalSeats} vé ({percent}%)
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* CỘT WIDGETS BÊN PHẢI */}
        <div className="space-y-6">

          {/* 🔴 WIDGET 1: KIỂM DUYỆT ĐÁNH GIÁ (TRỎ ĐẾN /manager/reviews) */}
          <div className="rounded-2xl border border-slate-800 bg-[#121726] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" /> Đánh giá gần đây
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Xử lý bình luận vi phạm</p>
              </div>
              <Link to="/manager/reviews" className="text-xs text-red-500 hover:underline font-semibold">
                Đến trang Reviews →
              </Link>
            </div>

            <div className="space-y-3">
              {reviewsList.map((rev) => (
                <div
                  key={rev.id}
                  className={`p-3 rounded-xl border text-xs space-y-2 transition ${
                    rev.isSpoil && rev.status !== "hidden"
                      ? "bg-amber-950/20 border-amber-500/40"
                      : "bg-slate-900/70 border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{rev.user}</span>
                    <span className="text-amber-400 font-bold">★ {rev.rating}.0</span>
                  </div>
                  <p className="text-slate-400 line-clamp-2">"{rev.comment}"</p>
                  
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                    <span className="text-[10px] text-slate-500 font-medium">{rev.movie}</span>
                    <button
                      onClick={() => handleToggleHideReview(rev.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold transition ${
                        rev.status === "hidden"
                          ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                          : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      }`}
                    >
                      {rev.status === "hidden" ? (
                        <> <Eye className="h-3 w-3" /> Hiện lại </>
                      ) : (
                        <> <EyeOff className="h-3 w-3" /> Ẩn bình luận </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🎟️ WIDGET 2: KHUYẾN MÃI (TRỎ ĐẾN /manager/promotions) */}
          <div className="rounded-2xl border border-slate-800 bg-[#121726] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold flex items-center gap-2">
                  <Gift className="h-4 w-4 text-pink-500" /> Voucher đang áp dụng
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Tỷ lệ sử dụng mã giảm giá</p>
              </div>
              <Link to="/manager/promotions" className="text-xs text-pink-400 hover:underline font-semibold">
                Đến Promotions →
              </Link>
            </div>

            <div className="space-y-3">
              {activePromotions.map((promo) => {
                const percent = Math.round((promo.used / promo.max) * 100);
                return (
                  <div key={promo.code} className="p-3 bg-slate-900/70 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded">
                        {promo.code}
                      </span>
                      <span className="text-slate-400 text-[11px]">{promo.used}/{promo.max} lượt</span>
                    </div>
                    
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-pink-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ⚡ WIDGET 3: NHẬT KÝ HỆ THỐNG REAL-TIME */}
          <div className="rounded-2xl border border-slate-800 bg-[#121726] p-5 space-y-4">
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-400" /> Nhật ký hệ thống
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Cập nhật giao dịch real-time</p>
            </div>

            <div className="space-y-3">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="flex items-start gap-3 rounded-xl bg-slate-900/60 p-3 border border-slate-800/60"
                >
                  <div className="mt-0.5">{act.icon}</div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-xs text-slate-200 leading-relaxed">{act.text}</p>
                    <span className="text-[10px] text-slate-500 block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;