import React, { useState } from "react";
import { Plus, Building2, Calendar, Film } from "lucide-react";

// 🎬 IMPORT DANH SÁCH PHIM TỪ FILE DATA
import { movies } from "../../data/movies";

function ManagerShowtimes() {
  // 1. DANH SÁCH CÁC HỆ THỐNG RẠP (Đồng bộ chuẩn 100% với giao diện Khách hàng)
  const cinemaChains = [
    { id: "all", name: "Tất cả rạp" },
    { id: "beta", name: "Beta" },
    { id: "cgv", name: "CGV" },
    { id: "bhd", name: "BHD" },
    { id: "ncc", name: "NCC" },
  ];

  // 2. CÁC NGÀY CHIẾU
  const dates = [
    { id: "12", label: "12 Th. 08" },
    { id: "13", label: "13 Th. 08" },
    { id: "14", label: "14 Th. 08" },
  ];

  // State bộ lọc của Manager
  const [selectedCinema, setSelectedCinema] = useState("all");
  const [selectedDate, setSelectedDate] = useState("12 Th. 08");
  const [selectedMovieId, setSelectedMovieId] = useState("all");

  // 3. TỰ ĐỘNG TẠO DANH SÁCH SUẤT CHIẾU THEO RẠP & PHIM
  const allShowtimes = movies.flatMap((movie) => {
    // Nếu rạp được chọn là 'all', sinh dữ liệu suất chiếu cho tất cả rạp (Beta, CGV, BHD, NCC)
    const targetCinemas =
      selectedCinema === "all"
        ? ["Beta", "CGV", "BHD", "NCC"]
        : [cinemaChains.find((c) => c.id === selectedCinema)?.name || "Beta"];

    return targetCinemas.flatMap((cinemaName) => {
      return (movie.showtimes || []).map((time, tIdx) => {
        const totalSeats = 120;
        // Giả lập số ghế đã bán
        const bookedSeats = [85, 72, 95, 48, 110, 60][(tIdx + movie.id) % 6];
        const percent = Math.round((bookedSeats / totalSeats) * 100);

        return {
          id: `${cinemaName}-${movie.id}-${tIdx}`,
          movieTitle: movie.title || movie.movieName,
          movieId: movie.id,
          cinemaName: `Rạp ${cinemaName}`,
          cinemaChainId: cinemaName.toLowerCase(),
          room: `Cinema 0${(tIdx % 3) + 1}`,
          date: selectedDate,
          time: time,
          booked: bookedSeats,
          total: totalSeats,
          percent: percent,
        };
      });
    });
  });

  // 4. LỌC SUẤT CHIẾU THEO BỘ LỌC CỦA MANAGER
  const filteredShowtimes = allShowtimes.filter((item) => {
    const matchCinema =
      selectedCinema === "all" || item.cinemaChainId === selectedCinema;
    const matchMovie =
      selectedMovieId === "all" || item.movieId === selectedMovieId;
    return matchCinema && matchMovie;
  });

  return (
    <div className="min-h-screen bg-[#060812] text-white p-6 space-y-6">
      
      {/* HEADER MANAGER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suất chiếu</h1>
          <p className="text-slate-400 text-sm mt-1">
            Quản lý suất chiếu tại các cụm rạp Beta, CGV, BHD, NCC.
          </p>
        </div>

        <button className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition shadow-lg shadow-red-600/20 self-start sm:self-auto">
          <Plus className="w-4 h-4" /> + Thêm suất
        </button>
      </div>

      {/* THANH BỘ LỌC ĐỒNG BỘ VỚI USER */}
      <div className="bg-[#0f1526] border border-[#1c253d] rounded-2xl p-4 space-y-4">
        
        {/* Lọc theo Thương hiệu Rạp (Beta, CGV, BHD, NCC) */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-red-500" /> Hệ thống Rạp:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {cinemaChains.map((chain) => (
              <button
                key={chain.id}
                onClick={() => setSelectedCinema(chain.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                  selectedCinema === chain.id
                    ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-600/30"
                    : "bg-[#12182b] border-[#1c253d] text-slate-400 hover:text-white hover:border-slate-600"
                }`}
              >
                {chain.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#1c253d]">
          {/* Lọc theo Phim */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-blue-400" /> Chọn Phim:
            </span>
            <select
              value={selectedMovieId}
              onChange={(e) => setSelectedMovieId(e.target.value)}
              className="w-full bg-[#12182b] border border-[#1c253d] text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-red-500"
            >
              <option value="all">Tất cả phim trong hệ thống ({movies.length})</option>
              {movies.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>

          {/* Lọc theo Ngày */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Ngày chiếu:
            </span>
            <div className="flex items-center gap-2">
              {dates.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDate(d.label)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition border ${
                    selectedDate === d.label
                      ? "bg-red-600/20 border-red-600 text-red-400"
                      : "bg-[#12182b] border-[#1c253d] text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* DANH SÁCH CÁC CARD SUẤT CHIẾU (GIAO DIỆN MANAGER BÁN VÉ) */}
      <div className="space-y-3">
        <p className="text-xs text-slate-400 px-1">
          Đang hiển thị <b>{filteredShowtimes.length}</b> suất chiếu
        </p>

        {filteredShowtimes.map((item) => (
          <div
            key={item.id}
            className="bg-[#0f1526] border border-[#1c253d] rounded-2xl p-5 hover:border-slate-700 transition space-y-3"
          >
            {/* Hàng 1: Tên Phim & Giờ Chiếu */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">{item.movieTitle}</h3>
                <p className="text-slate-400 text-xs mt-1">
                  <span className="text-red-400 font-semibold">{item.cinemaName}</span> ({item.room}) • {item.date}
                </p>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black text-red-500 tracking-tight">
                  {item.time}
                </span>
                <p className="text-slate-400 text-xs mt-0.5">
                  {item.booked}/{item.total} ghế
                </p>
              </div>
            </div>

            {/* Hàng 2: Progress bar lấp đầy ghế */}
            <div>
              <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-red-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
              <p className="text-slate-400 text-xs mt-2 font-medium">
                Đã bán {item.percent}%
              </p>
            </div>
          </div>
        ))}

        {filteredShowtimes.length === 0 && (
          <div className="text-center py-12 bg-[#0f1526] rounded-2xl border border-[#1c253d]">
            <p className="text-slate-400 text-sm">
              Không có suất chiếu nào phù hợp với cụm rạp đã chọn.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

export default ManagerShowtimes;