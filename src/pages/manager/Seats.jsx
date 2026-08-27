import React, { useState } from "react";
import { Building2, MapPin, Video, Armchair, RefreshCw, CheckCircle2, XCircle } from "lucide-react";

function Seats() {
  // 1. DANH SÁCH KHU VỰC
  const cities = [
    { id: "hanoi", name: "Hà Nội" },
    { id: "hcm", name: "TP. Hồ Chí Minh" },
  ];

  // 2. DANH SÁCH CỤM RẠP (ĐÃ BỔ SUNG ĐẦY ĐỦ BHD STAR CẢ HÀ NỘI VÀ TP.HCM)
  const clusters = [
    // Hà Nội
    { id: "beta-tx", name: "Beta Thanh Xuân", city: "hanoi" },
    { id: "cgv-vt", name: "CGV Vincom Bà Triệu", city: "hanoi" },
    { id: "bhd-pnt", name: "BHD Phạm Ngọc Thạch", city: "hanoi" },
    { id: "ncc-lh", name: "NCC Láng Hạ", city: "hanoi" },

    // TP. Hồ Chí Minh
    { id: "cgv-lm", name: "CGV Landmark 81", city: "hcm" },
    { id: "beta-qt", name: "Beta Quang Trung", city: "hcm" },
    { id: "bhd-bitexco", name: "BHD Bitexco", city: "hcm" },
    { id: "bhd-thaodien", name: "BHD Thảo Điền", city: "hcm" },
  ];

  // 3. DANH SÁCH PHÒNG CHIẾU TƯƠNG ỨNG TỪNG CỤM RẠP
  const screens = [
    // --- HÀ NỘI ---
    { id: "screen-1", name: "Cinema 01 (2D)", clusterId: "beta-tx", rows: 6, cols: 8 },
    { id: "screen-2", name: "Cinema 02 (3D VIP)", clusterId: "beta-tx", rows: 7, cols: 10 },
    { id: "screen-3", name: "Cinema 01 (IMAX)", clusterId: "cgv-vt", rows: 8, cols: 10 },
    { id: "screen-bhd-hn-1", name: "Cinema 01 (2D Standard)", clusterId: "bhd-pnt", rows: 7, cols: 10 },
    { id: "screen-bhd-hn-2", name: "Cinema 02 (3D Premium)", clusterId: "bhd-pnt", rows: 6, cols: 8 },
    { id: "screen-4", name: "Phòng chiếu 01", clusterId: "ncc-lh", rows: 6, cols: 8 },

    // --- TP. HỒ CHÍ MINH ---
    { id: "screen-5", name: "Cinema 01 (IMAX Laser)", clusterId: "cgv-lm", rows: 8, cols: 12 },
    { id: "screen-6", name: "Cinema 01", clusterId: "beta-qt", rows: 6, cols: 8 },
    { id: "screen-bhd-hcm-1", name: "Cinema 01 (3D Gold)", clusterId: "bhd-bitexco", rows: 7, cols: 10 },
    { id: "screen-bhd-hcm-2", name: "Cinema 03 (2D Standard)", clusterId: "bhd-thaodien", rows: 6, cols: 8 },
  ];

  // STATES BỘ LỌC
  const [selectedCity, setSelectedCity] = useState("hanoi");

  const availableClusters = clusters.filter((c) => c.city === selectedCity);
  const [selectedCluster, setSelectedCluster] = useState(availableClusters[0]?.id || "beta-tx");

  const availableScreens = screens.filter((s) => s.clusterId === selectedCluster);
  const [selectedScreen, setSelectedScreen] = useState(availableScreens[0]?.id || "screen-1");

  // XỬ LÝ KHI ĐỔI KHU VỰC
  const handleCityChange = (cityId) => {
    setSelectedCity(cityId);
    const newClusters = clusters.filter((c) => c.city === cityId);
    if (newClusters.length > 0) {
      setSelectedCluster(newClusters[0].id);
      const newScreens = screens.filter((s) => s.clusterId === newClusters[0].id);
      if (newScreens.length > 0) setSelectedScreen(newScreens[0].id);
    }
  };

  // XỬ LÝ KHI ĐỔI CỤM RẠP
  const handleClusterChange = (clusterId) => {
    setSelectedCluster(clusterId);
    const newScreens = screens.filter((s) => s.clusterId === clusterId);
    if (newScreens.length > 0) setSelectedScreen(newScreens[0].id);
  };

  // DỮ LIỆU PHÒNG HIỆN TẠI
  const currentScreen = screens.find((s) => s.id === selectedScreen) || screens[0];
  const totalCols = currentScreen.cols;
  const totalRows = currentScreen.rows;

  // GIẢ LẬP DANH SÁCH GHẾ ĐÃ ĐẶT / BẢO TRÌ
  const bookedSeatIndexes = [3, 4, 12, 15, 22, 23, 24, 31, 32];
  const maintenanceSeatIndexes = [8, 9];

  // HÀM TẠO SƠ ĐỒ GHẾ DỰA THEO HÀNG & CỘT CỦA PHÒNG
  const generateSeats = () => {
    const seatsList = [];
    let idCounter = 1;

    for (let r = 0; r < totalRows; r++) {
      const rowLabel = String.fromCharCode(65 + r); // A, B, C...
      for (let c = 1; c <= totalCols; c++) {
        const id = idCounter++;
        let type = "standard"; // Thường
        if (r >= 2 && r < totalRows - 1) type = "vip"; // Hàng giữa là VIP
        if (r === totalRows - 1) type = "sweetbox"; // Hàng cuối là ghế đôi

        let status = "available";
        if (bookedSeatIndexes.includes(id)) status = "booked";
        if (maintenanceSeatIndexes.includes(id)) status = "maintenance";

        seatsList.push({
          id,
          name: `${rowLabel}${c}`,
          row: rowLabel,
          col: c,
          type,
          status,
          price: type === "vip" ? "110.000đ" : type === "sweetbox" ? "220.000đ" : "85.000đ",
        });
      }
    }
    return seatsList;
  };

  const seats = generateSeats();
  const [selectedSeat, setSelectedSeat] = useState(null);

  // THỐNG KÊ
  const bookedCount = seats.filter((s) => s.status === "booked").length;
  const maintenanceCount = seats.filter((s) => s.status === "maintenance").length;
  const availableCount = seats.length - bookedCount - maintenanceCount;
  const occupancyRate = Math.round((bookedCount / seats.length) * 100);

  // MÀU GHẾ THEO LOẠI HOẶC TRẠNG THÁI
  const getSeatStyle = (seat) => {
    if (seat.status === "booked") {
      return "bg-red-600 text-white border-red-500 cursor-not-allowed shadow-md shadow-red-600/20";
    }
    if (seat.status === "maintenance") {
      return "bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed";
    }

    if (selectedSeat?.id === seat.id) {
      return "bg-emerald-500 text-slate-950 font-bold border-emerald-400 scale-105 shadow-lg shadow-emerald-500/30";
    }

    switch (seat.type) {
      case "vip":
        return "bg-amber-950/50 text-amber-400 border-amber-700/60 hover:bg-amber-900/80 hover:border-amber-500";
      case "sweetbox":
        return "bg-purple-950/50 text-purple-300 border-purple-700/60 hover:bg-purple-900/80 hover:border-purple-500";
      default:
        return "bg-slate-800/80 text-slate-300 border-slate-700/60 hover:bg-slate-700 hover:text-white";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sơ đồ ghế & Trạng thái</h1>
          <p className="text-slate-400 text-sm mt-1">
            Theo dõi tình trạng đặt ghế thực tế theo từng cụm rạp và phòng chiếu.
          </p>
        </div>

        <button
          onClick={() => setSelectedSeat(null)}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-4 py-2.5 rounded-lg text-sm transition"
        >
          <RefreshCw className="w-4 h-4" /> Làm mới sơ đồ
        </button>
      </div>

      {/* BỘ LỌC 3 CẤP: KHU VỰC -> CỤM RẠP (CÓ BHD) -> PHÒNG CHIẾU */}
      <div className="bg-[#121726] p-4 rounded-xl border border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Lọc Khu vực */}
        <div>
          <label className="text-xs text-slate-400 font-semibold mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-red-500" /> Khu vực
          </label>
          <select
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
          >
            {cities.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Lọc Cụm rạp */}
        <div>
          <label className="text-xs text-slate-400 font-semibold mb-1.5 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-blue-400" /> Cụm rạp
          </label>
          <select
            value={selectedCluster}
            onChange={(e) => handleClusterChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
          >
            {availableClusters.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Lọc Phòng chiếu */}
        <div>
          <label className="text-xs text-slate-400 font-semibold mb-1.5 flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-purple-400" /> Phòng chiếu
          </label>
          <select
            value={selectedScreen}
            onChange={(e) => setSelectedScreen(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
          >
            {availableScreens.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

      </div>

      {/* THỐNG KÊ NHANH */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#121726] border border-slate-800/80 p-4 rounded-xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Tổng số ghế</span>
          <span className="text-2xl font-bold text-white">{seats.length}</span>
        </div>

        <div className="bg-[#121726] border border-slate-800/80 p-4 rounded-xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Đã đặt</span>
          <span className="text-2xl font-bold text-red-500">{bookedCount}</span>
        </div>

        <div className="bg-[#121726] border border-slate-800/80 p-4 rounded-xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Còn trống</span>
          <span className="text-2xl font-bold text-emerald-400">{availableCount}</span>
        </div>

        <div className="bg-[#121726] border border-slate-800/80 p-4 rounded-xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Tỷ lệ lấp đầy</span>
          <span className="text-2xl font-bold text-purple-400">{occupancyRate}%</span>
        </div>
      </div>

      {/* KHU VỰC MÀN HÌNH & TẠO SƠ ĐỒ GHẾ */}
      <div className="bg-[#121726] border border-slate-800 rounded-xl p-6 space-y-8">

        {/* MÀN HÌNH CONG */}
        <div className="max-w-xl mx-auto text-center space-y-2">
          <div className="h-2 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full shadow-[0_10px_25px_rgba(239,68,68,0.5)]" />
          <p className="text-[11px] font-bold text-slate-400 tracking-[0.2em]">MÀN HÌNH CHIẾU</p>
        </div>

        {/* SƠ ĐỒ GHẾ */}
        <div className="overflow-x-auto pb-4 scrollbar-none">
          <div
            className="grid gap-2.5 mx-auto w-max"
            style={{ gridTemplateColumns: `repeat(${totalCols}, minmax(40px, 1fr))` }}
          >
            {seats.map((seat) => (
              <button
                key={seat.id}
                onClick={() => setSelectedSeat(seat)}
                disabled={seat.status === "maintenance"}
                className={`h-10 rounded-lg text-xs font-bold transition border flex items-center justify-center ${getSeatStyle(seat)}`}
                title={`Ghế ${seat.name} - ${seat.price}`}
              >
                {seat.name}
              </button>
            ))}
          </div>
        </div>

        {/* CHÚ THÍCH */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-800 border border-slate-700" />
            <span>Ghế thường</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-950/60 border border-amber-700" />
            <span>Ghế VIP</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-950/60 border border-purple-700" />
            <span>Ghế đôi (Sweetbox)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-600 border border-red-500" />
            <span>Đã đặt</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-900 border border-slate-800" />
            <span>Bảo trì</span>
          </div>
        </div>

      </div>

      {/* THÔNG TIN GHẾ ĐƯỢC CHỌN */}
      {selectedSeat && (
        <div className="bg-[#121726] border border-slate-800 p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-600/10 p-3 rounded-xl border border-red-600/30 text-red-500">
              <Armchair className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Ghế {selectedSeat.name}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Loại: <b className="text-white uppercase">{selectedSeat.type}</b> • Giá vé: <b className="text-amber-400">{selectedSeat.price}</b>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="text-xs text-slate-400">Trạng thái:</span>
            {selectedSeat.status === "booked" ? (
              <span className="bg-red-950/80 text-red-400 border border-red-800 px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5" /> Đã đặt vé
              </span>
            ) : (
              <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Còn trống
              </span>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default Seats;