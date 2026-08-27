import React, { useState } from "react";
import { Plus, Video, MapPin, SlidersHorizontal, Building2 } from "lucide-react";
import Modal from "../../components/Modal";

function Screens() {
  // 1. DANH SÁCH BỘ LỌC KHU VỰC
  const cities = [
    { id: "all", name: "Tất cả khu vực" },
    { id: "hanoi", name: "Hà Nội" },
    { id: "hcm", name: "TP. Hồ Chí Minh" },
  ];

  // 2. DANH SÁCH BỘ LỌC CHUỖI RẠP
  const chains = [
    { id: "all", name: "Tất cả rạp" },
    { id: "beta", name: "Beta Cinemas" },
    { id: "cgv", name: "CGV Cinemas" },
    { id: "bhd", name: "BHD Star" },
    { id: "ncc", name: "NCC (Trung tâm CPQG)" },
  ];

  // 3. DANH SÁCH CÁC PHÒNG CHIẾU TẠI CÁC CỤM RẠP HÀ NỘI & TP.HCM
  const [screensList, setScreensList] = useState([
    // === HÀ NỘI ===
    { id: 1, name: "Cinema 01", clusterName: "Beta Thanh Xuân", chain: "beta", city: "hanoi", seats: 120, type: "2D Standard", status: "active" },
    { id: 2, name: "Cinema 02", clusterName: "Beta Mỹ Đình", chain: "beta", city: "hanoi", seats: 150, type: "3D VIP", status: "active" },
    { id: 3, name: "Cinema 01 (IMAX)", clusterName: "CGV Vincom Bà Triệu", chain: "cgv", city: "hanoi", seats: 240, type: "IMAX Laser", status: "active" },
    { id: 4, name: "Cinema 02", clusterName: "CGV Royal City", chain: "cgv", city: "hanoi", seats: 160, type: "4DX", status: "maintenance" },
    { id: 5, name: "Cinema 01", clusterName: "BHD Phạm Ngọc Thạch", chain: "bhd", city: "hanoi", seats: 140, type: "2D Standard", status: "active" },
    { id: 6, name: "Phòng chiếu 01", clusterName: "NCC Láng Hạ", chain: "ncc", city: "hanoi", seats: 350, type: "2D Standard", status: "active" },

    // === TP. HỒ CHÍ MINH (SÀI GÒN) ===
    { id: 7, name: "Cinema 01", clusterName: "Beta Quang Trung", chain: "beta", city: "hcm", seats: 130, type: "2D Standard", status: "active" },
    { id: 8, name: "Cinema 01 (IMAX)", clusterName: "CGV Landmark 81", chain: "cgv", city: "hcm", seats: 300, type: "IMAX 3D", status: "active" },
    { id: 9, name: "Cinema 02", clusterName: "CGV Crescent Mall", chain: "cgv", city: "hcm", seats: 180, type: "L'Amour (Sofa)", status: "active" },
    { id: 10, name: "Cinema 01", clusterName: "BHD Bitexco", chain: "bhd", city: "hcm", seats: 150, type: "3D Premium", status: "active" },
    { id: 11, name: "Cinema 03", clusterName: "BHD Thảo Điền", chain: "bhd", city: "hcm", seats: 110, type: "2D Standard", status: "closed" },
  ]);

  // STATE BỘ LỌC
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedChain, setSelectedChain] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // STATE MODAL THÊM PHÒNG CHIẾU
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newScreen, setNewScreen] = useState({
    name: "",
    clusterName: "",
    chain: "beta",
    city: "hanoi",
    seats: 120,
    type: "2D Standard",
    status: "active",
  });

  // LỌC PHÒNG CHIẾU THEO CẢ KHU VỰC, RẠP VÀ TRẠNG THÁI
  const filteredScreens = screensList.filter((screen) => {
    const matchCity = selectedCity === "all" || screen.city === selectedCity;
    const matchChain = selectedChain === "all" || screen.chain === selectedChain;
    const matchStatus = selectedStatus === "all" || screen.status === selectedStatus;
    return matchCity && matchChain && matchStatus;
  });

  // HIỂN THỊ BADGE TRẠNG THÁI
  const renderStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 px-2.5 py-1 rounded-md text-xs font-semibold">
            Hoạt động
          </span>
        );
      case "maintenance":
        return (
          <span className="bg-amber-950/70 text-amber-400 border border-amber-800/60 px-2.5 py-1 rounded-md text-xs font-semibold">
            Bảo trì
          </span>
        );
      case "closed":
        return (
          <span className="bg-rose-950/70 text-rose-400 border border-rose-800/60 px-2.5 py-1 rounded-md text-xs font-semibold">
            Tạm ngưng
          </span>
        );
      default:
        return null;
    }
  };

  // HÀM THÊM PHÒNG CHIẾU MỚI
  const handleAddScreen = (e) => {
    e.preventDefault();
    const item = {
      ...newScreen,
      id: Date.now(),
      seats: Number(newScreen.seats),
    };
    setScreensList([...screensList, item]);
    setIsModalOpen(false);
    setNewScreen({
      name: "",
      clusterName: "",
      chain: "beta",
      city: "hanoi",
      seats: 120,
      type: "2D Standard",
      status: "active",
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white p-6 space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phòng chiếu theo Cụm rạp</h1>
          <p className="text-slate-400 text-sm mt-1">
            Quản lý danh sách phòng chiếu thuộc các cụm rạp tại Hà Nội và TP. Hồ Chí Minh.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition shadow-lg shadow-red-600/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Thêm phòng chiếu
        </button>
      </div>

      {/* THANH BỘ LỌC ĐA NĂNG (KHU VỰC, RẠP, TRẠNG THÁI) */}
      <div className="bg-[#121726]/80 p-4 rounded-xl border border-slate-800 space-y-3">
        
        {/* Hàng 1: Nút chọn Khu Vực (Hà Nội / TP.HCM) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <MapPin className="w-4 h-4 text-red-500 shrink-0 mr-1" />
          <span className="text-xs text-slate-400 font-semibold mr-1 shrink-0">Khu vực:</span>
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => setSelectedCity(city.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition border ${
                selectedCity === city.id
                  ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>

        {/* Hàng 2: Chọn Thương hiệu Rạp & Trạng thái */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            <Building2 className="w-4 h-4 text-blue-400 shrink-0 mr-1" />
            <span className="text-xs text-slate-400 font-semibold mr-1 shrink-0">Cụm rạp:</span>
            {chains.map((chain) => (
              <button
                key={chain.id}
                onClick={() => setSelectedChain(chain.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition ${
                  selectedChain === chain.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {chain.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-slate-700"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="maintenance">Bảo trì</option>
              <option value="closed">Tạm ngưng</option>
            </select>
          </div>
        </div>

      </div>

      {/* THỐNG KÊ */}
      <div className="text-xs text-slate-400 flex items-center justify-between px-1">
        <span>Hiển thị <b>{filteredScreens.length}</b> phòng chiếu</span>
      </div>

      {/* GRID PHÒNG CHIẾU */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredScreens.map((screen) => (
          <div
            key={screen.id}
            className="bg-[#121726] border border-slate-800/80 rounded-xl p-5 hover:border-slate-700/80 transition space-y-4 flex flex-col justify-between"
          >
            {/* Header Thẻ: Icon + Badge Trạng Thái */}
            <div className="flex items-start justify-between">
              <div className="bg-[#1a2136] p-2.5 rounded-xl border border-slate-700/50">
                <Video className="w-5 h-5 text-purple-400" />
              </div>
              {renderStatusBadge(screen.status)}
            </div>

            {/* Thông tin Phòng & Tên Cụm Rạp */}
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide">{screen.name}</h3>
              <p className="text-red-400 text-xs font-semibold mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {screen.clusterName}{" "}
                <span className="text-slate-500 font-normal">
                  ({screen.city === "hanoi" ? "Hà Nội" : "TP.HCM"})
                </span>
              </p>
            </div>

            {/* Khối Thông Số */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-[#181f32] p-3 rounded-lg border border-slate-800/60">
                <span className="text-[11px] text-slate-400 font-medium block mb-1">Số ghế</span>
                <span className="text-lg font-bold text-white">{screen.seats}</span>
              </div>

              <div className="bg-[#181f32] p-3 rounded-lg border border-slate-800/60">
                <span className="text-[11px] text-slate-400 font-medium block mb-1">Loại phòng</span>
                <span className="text-lg font-bold text-white">{screen.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL THÊM PHÒNG CHIẾU */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Thêm phòng chiếu mới">
        <form onSubmit={handleAddScreen} className="space-y-4 mt-2">
          <div>
            <label className="text-xs text-slate-400 block mb-1.5 font-medium">Tên phòng chiếu</label>
            <input
              type="text"
              placeholder="VD: Cinema 04, Phòng IMAX..."
              value={newScreen.name}
              onChange={(e) => setNewScreen({ ...newScreen, name: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none focus:border-red-500 text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">Thành phố</label>
              <select
                value={newScreen.city}
                onChange={(e) => setNewScreen({ ...newScreen, city: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none focus:border-red-500 text-sm"
              >
                <option value="hanoi">Hà Nội</option>
                <option value="hcm">TP. Hồ Chí Minh</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">Hệ thống rạp</label>
              <select
                value={newScreen.chain}
                onChange={(e) => setNewScreen({ ...newScreen, chain: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none focus:border-red-500 text-sm"
              >
                <option value="beta">Beta Cinemas</option>
                <option value="cgv">CGV Cinemas</option>
                <option value="bhd">BHD Star</option>
                <option value="ncc">NCC</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1.5 font-medium">Tên Cụm rạp chi tiết</label>
            <input
              type="text"
              placeholder="VD: CGV Vincom Bà Triệu, Beta Quang Trung..."
              value={newScreen.clusterName}
              onChange={(e) => setNewScreen({ ...newScreen, clusterName: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none focus:border-red-500 text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">Số lượng ghế</label>
              <input
                type="number"
                value={newScreen.seats}
                onChange={(e) => setNewScreen({ ...newScreen, seats: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none focus:border-red-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">Loại phòng</label>
              <select
                value={newScreen.type}
                onChange={(e) => setNewScreen({ ...newScreen, type: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none focus:border-red-500 text-sm"
              >
                <option value="2D Standard">2D Standard</option>
                <option value="3D VIP">3D VIP</option>
                <option value="IMAX Laser">IMAX Laser</option>
                <option value="4DX">4DX</option>
                <option value="L'Amour (Sofa)">L'Amour (Sofa)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm hover:bg-slate-800 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white text-sm hover:bg-red-700 transition shadow-lg shadow-red-600/20"
            >
              Lưu phòng
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

export default Screens;