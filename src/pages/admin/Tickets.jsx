import React, { useState, useMemo } from "react";
import {
  Search,
  RotateCcw,
  Ticket as TicketIcon,
  DollarSign,
  Clock,
  CheckCircle2,
  X,
  Calendar,
  Film,
  User,
  Phone,
  Building2,
  Info
} from "lucide-react";

export default function Tickets() {
  // 1. DỮ LIỆU VÉ ĐÃ ĐƯỢC ĐỒNG BỘ VỚI DANH SÁCH PHIM CỦA BẠN
  const [tickets, setTickets] = useState(() => {
    const now = new Date();
    
    // Hàm tạo mốc thời gian linh hoạt dựa trên thời gian thực
    const addHours = (h) => new Date(now.getTime() + h * 60 * 60 * 1000);
    const formatDateStr = (dateObj) => {
      const d = String(dateObj.getDate()).padStart(2, '0');
      const m = String(dateObj.getMonth() + 1).padStart(2, '0');
      const y = dateObj.getFullYear();
      return `${d}/${m}/${y}`;
    };
    const formatTimeStr = (dateObj) => {
      const h = String(dateObj.getHours()).padStart(2, '0');
      const min = String(dateObj.getMinutes()).padStart(2, '0');
      return `${h}:${min}`;
    };

    const t1 = addHours(36); // > 24h (Đủ điều kiện hoàn 100%)
    const t2 = addHours(18); // 12h - 24h (Đủ điều kiện hoàn 50%)
    const t3 = addHours(5);  // < 12h (Không thể hoàn)
    const t4 = addHours(-24); // Đã chiếu

    return [
      {
        id: "TK00128",
        customer: "Nguyễn Văn An",
        phone: "0988 123 456",
        movie: "Attack on Titan",
        theater: "CGV Vincom Center",
        seats: "A5, A6",
        date: formatDateStr(t1),
        time: formatTimeStr(t1),
        isoShowtime: t1.toISOString(),
        amount: 220000,
        status: "paid",
      },
      {
        id: "TK00127",
        customer: "Trần Minh Anh",
        phone: "0912 345 678",
        movie: "Demon Slayer",
        theater: "Lotte Cinema Landmark",
        seats: "B5, B6, B7",
        date: formatDateStr(t2),
        time: formatTimeStr(t2),
        isoShowtime: t2.toISOString(),
        amount: 270000,
        status: "paid",
      },
      {
        id: "TK00126",
        customer: "Lê Hoàng Nam",
        phone: "0905 112 233",
        movie: "Avatar",
        theater: "Galaxy Cinema Nguyễn Du",
        seats: "C5",
        date: formatDateStr(t3),
        time: formatTimeStr(t3),
        isoShowtime: t3.toISOString(),
        amount: 110000,
        status: "paid",
      },
      {
        id: "TK00125",
        customer: "Phạm Thị Hương",
        phone: "0934 888 999",
        movie: "Minecraft",
        theater: "BHD Star Cineplex",
        seats: "D1, D2",
        date: formatDateStr(t1),
        time: "19:30",
        isoShowtime: t1.toISOString(),
        amount: 200000,
        status: "pending",
      },
      {
        id: "TK00124",
        customer: "Đặng Quốc Bảo",
        phone: "0977 444 555",
        movie: "The LEGO Movie",
        theater: "CGV Vincom Center",
        seats: "F8, F9",
        date: formatDateStr(t4),
        time: formatTimeStr(t4),
        isoShowtime: t4.toISOString(),
        amount: 240000,
        status: "paid",
      },
      {
        id: "TK00123",
        customer: "Vũ Thảo Trinh",
        phone: "0922 666 777",
        movie: "Minions",
        theater: "Galaxy Cinema Nguyễn Du",
        seats: "E10",
        date: "10/08/2026",
        time: "19:45",
        isoShowtime: new Date("2026-08-10T19:45:00").toISOString(),
        amount: 100000,
        status: "refunded",
        refundAmount: 100000,
        refundRate: 100,
        refundReason: "Khách đổi lịch bận đột xuất",
      },
      {
        id: "TK00122",
        customer: "Hoàng Đức Anh",
        phone: "0966 333 222",
        movie: "Mulan",
        theater: "Lotte Cinema Landmark",
        seats: "G3, G4",
        date: formatDateStr(t1),
        time: "20:40",
        isoShowtime: t1.toISOString(),
        amount: 190000,
        status: "paid",
      },
      {
        id: "TK00121",
        customer: "Bùi Tuyết Mai",
        phone: "0918 999 111",
        movie: "Scary Movie",
        theater: "BHD Star Cineplex",
        seats: "H1, H2",
        date: formatDateStr(t1),
        time: "17:25",
        isoShowtime: t1.toISOString(),
        amount: 180000,
        status: "paid",
      },
      {
        id: "TK00120",
        customer: "Trịnh Quốc Việt",
        phone: "0903 777 888",
        movie: "Spider-Man",
        theater: "CGV Vincom Center",
        seats: "J5, J6",
        date: formatDateStr(t2),
        time: formatTimeStr(t2),
        isoShowtime: t2.toISOString(),
        amount: 210000,
        status: "paid",
      },
    ];
  });

  // State Tìm kiếm, Lọc & Modal
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [movieFilter, setMovieFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refundReason, setRefundReason] = useState("Khách hàng yêu cầu hủy vé");

  // 2. LOGIC TÍNH TOÁN HOÀN VÉ DỰA TRÊN THỜI GIAN
  const calculateRefundPolicy = (ticket) => {
    const now = new Date();
    const showtime = new Date(ticket.isoShowtime || new Date());
    const diffInMs = showtime.getTime() - now.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours >= 24) {
      return {
        canRefund: true,
        rate: 100,
        refundAmount: ticket.amount,
        hoursLeft: diffInHours.toFixed(1),
        tag: "Trước > 24h (Hoàn 100%)",
        tagStyle: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        desc: "Đủ điều kiện hoàn lại 100% giá trị tiền vé.",
      };
    } else if (diffInHours >= 12) {
      return {
        canRefund: true,
        rate: 50,
        refundAmount: ticket.amount * 0.5,
        hoursLeft: diffInHours.toFixed(1),
        tag: "Trước 12h - 24h (Hoàn 50%)",
        tagStyle: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        desc: "Đủ điều kiện hoàn lại 50% giá trị tiền vé.",
      };
    } else if (diffInHours > 0) {
      return {
        canRefund: false,
        rate: 0,
        refundAmount: 0,
        hoursLeft: diffInHours.toFixed(1),
        tag: "Dưới 12h (Không được hoàn)",
        tagStyle: "bg-rose-500/10 text-rose-400 border-rose-500/30",
        desc: "Vé sát giờ chiếu (dưới 12 tiếng) không áp dụng chính sách hoàn trả.",
      };
    } else {
      return {
        canRefund: false,
        rate: 0,
        refundAmount: 0,
        hoursLeft: 0,
        tag: "Đã chiếu",
        tagStyle: "bg-slate-800 text-slate-500 border-slate-700",
        desc: "Suất chiếu đã diễn ra.",
      };
    }
  };

  // 3. XỬ LÝ HOÀN VÉ
  const handleConfirmRefund = () => {
    if (!selectedTicket) return;
    const policy = calculateRefundPolicy(selectedTicket);

    if (!policy.canRefund) {
      alert("Vé này không đủ điều kiện để hoàn tiền!");
      return;
    }

    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id
          ? {
              ...t,
              status: "refunded",
              refundAmount: policy.refundAmount,
              refundRate: policy.rate,
              refundReason: refundReason,
            }
          : t
      )
    );

    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  // 4. LỌC DANH SÁCH VÉ
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchSearch =
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.phone.includes(searchTerm) ||
        t.movie.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === "all" || t.status === statusFilter;
      const matchMovie = movieFilter === "all" || t.movie === movieFilter;

      return matchSearch && matchStatus && matchMovie;
    });
  }, [tickets, searchTerm, statusFilter, movieFilter]);

  // 5. THỐNG KÊ NHANH (KPIs)
  const stats = useMemo(() => {
    const totalTickets = tickets.length;
    const totalRevenue = tickets
      .filter((t) => t.status === "paid")
      .reduce((acc, t) => acc + t.amount, 0);
    const totalRefunded = tickets
      .filter((t) => t.status === "refunded")
      .reduce((acc, t) => acc + (t.refundAmount || 0), 0);
    const pendingCount = tickets.filter((t) => t.status === "pending").length;

    return { totalTickets, totalRevenue, totalRefunded, pendingCount };
  }, [tickets]);

  const formatVND = (num) => new Intl.NumberFormat("vi-VN").format(num) + "đ";

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <TicketIcon className="w-8 h-8 text-red-500" />
            Quản Lý Vé & Hoàn Vé
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Theo dõi danh sách vé, bộ lọc tìm kiếm và hỗ trợ xử lý hoàn vé tự động theo khung giờ chiếu.
          </p>
        </div>
      </div>

      {/* KPI STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-lg backdrop-blur-sm">
          <div className="p-3 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20">
            <TicketIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Tổng số vé hệ thống</p>
            <p className="text-xl font-bold text-white mt-0.5">{stats.totalTickets} vé</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-lg backdrop-blur-sm">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Doanh thu hiện tại</p>
            <p className="text-xl font-bold text-emerald-400 mt-0.5">{formatVND(stats.totalRevenue)}</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-lg backdrop-blur-sm">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Tổng tiền đã hoàn</p>
            <p className="text-xl font-bold text-purple-400 mt-0.5">{formatVND(stats.totalRefunded)}</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-lg backdrop-blur-sm">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Vé chờ thanh toán</p>
            <p className="text-xl font-bold text-amber-400 mt-0.5">{stats.pendingCount} vé</p>
          </div>
        </div>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-3 shadow-md">
        {/* Tìm kiếm */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo Mã vé, Tên khách hàng, SĐT, Tên phim..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-red-500 transition"
          />
        </div>

        {/* Lọc Trạng Thái */}
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 outline-none focus:border-red-500 transition cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="paid">Đã thanh toán</option>
            <option value="pending">Chờ thanh toán</option>
            <option value="refunded">Đã hoàn vé</option>
          </select>

          {/* Lọc Phim (Theo dữ liệu của bạn) */}
          <select
            value={movieFilter}
            onChange={(e) => setMovieFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 outline-none focus:border-red-500 transition cursor-pointer hidden sm:block"
          >
            <option value="all">Tất cả phim</option>
            <option value="Attack on Titan">Attack on Titan</option>
            <option value="Avatar">Avatar</option>
            <option value="Demon Slayer">Demon Slayer</option>
            <option value="The LEGO Movie">The LEGO Movie</option>
            <option value="Minecraft">Minecraft</option>
            <option value="Minions">Minions</option>
            <option value="Mulan">Mulan</option>
            <option value="Scary Movie">Scary Movie</option>
            <option value="Spider-Man">Spider-Man</option>
          </select>
        </div>
      </div>

      {/* TICKETS TABLE */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-5">Mã Vé</th>
                <th className="py-4 px-5">Khách Hàng</th>
                <th className="py-4 px-5">Phim & Rạp</th>
                <th className="py-4 px-5">Suất Chiếu</th>
                <th className="py-4 px-5">Điều Kiện Hoàn</th>
                <th className="py-4 px-5">Số Tiền</th>
                <th className="py-4 px-5">Trạng Thái</th>
                <th className="py-4 px-5 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => {
                  const policy = calculateRefundPolicy(ticket);

                  return (
                    <tr key={ticket.id} className="hover:bg-slate-800/40 transition">
                      {/* Mã vé */}
                      <td className="py-4 px-5 font-bold text-red-500 whitespace-nowrap">
                        #{ticket.id}
                      </td>

                      {/* Khách hàng */}
                      <td className="py-4 px-5">
                        <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" /> {ticket.customer}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" /> {ticket.phone}
                        </div>
                      </td>

                      {/* Phim & Rạp */}
                      <td className="py-4 px-5 max-w-[200px]">
                        <div className="font-medium text-slate-200 truncate flex items-center gap-1.5">
                          <Film className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {ticket.movie}
                        </div>
                        <div className="text-xs text-slate-400 truncate mt-0.5 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-slate-500 shrink-0" /> {ticket.theater}
                        </div>
                      </td>

                      {/* Suất chiếu */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        <div className="font-semibold text-slate-200 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" /> {ticket.date}
                        </div>
                        <div className="text-xs text-red-400 font-bold mt-0.5">
                          {ticket.time} | Ghế: {ticket.seats}
                        </div>
                      </td>

                      {/* Điều kiện hoàn */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        {ticket.status === "paid" ? (
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${policy.tagStyle}`}>
                            {policy.tag}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500 italic">—</span>
                        )}
                      </td>

                      {/* Số tiền */}
                      <td className="py-4 px-5 font-bold text-slate-100 whitespace-nowrap">
                        {formatVND(ticket.amount)}
                      </td>

                      {/* Trạng thái */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        {ticket.status === "paid" && (
                          <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-md text-xs font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Đã thanh toán
                          </span>
                        )}
                        {ticket.status === "pending" && (
                          <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-md text-xs font-semibold">
                            <Clock className="w-3.5 h-3.5" /> Chờ thanh toán
                          </span>
                        )}
                        {ticket.status === "refunded" && (
                          <span className="inline-flex items-center gap-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 px-2.5 py-1 rounded-md text-xs font-semibold">
                            <RotateCcw className="w-3.5 h-3.5" /> Đã hoàn vé
                          </span>
                        )}
                      </td>

                      {/* Thao tác */}
                      <td className="py-4 px-5 text-center whitespace-nowrap">
                        {ticket.status === "paid" ? (
                          <button
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setIsModalOpen(true);
                            }}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                              policy.canRefund
                                ? "border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600 shadow-sm"
                                : "border-slate-800 bg-slate-950 text-slate-600 cursor-not-allowed"
                            }`}
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Hoàn vé
                          </button>
                        ) : ticket.status === "refunded" ? (
                          <div className="text-xs text-purple-400 font-medium">
                            Đã nhận {formatVND(ticket.refundAmount)}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-600">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-slate-500 text-sm">
                    Không tìm thấy vé phù hợp với thông tin tìm kiếm.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL POPUP XÁC NHẬN HOÀN VÉ */}
      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-slate-100 space-y-5 relative">
            {/* Header Modal */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Xác nhận yêu cầu hoàn vé</h3>
                  <p className="text-xs text-slate-400">Kiểm tra thông tin suất chiếu và mức hoàn trả</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Modal */}
            {(() => {
              const policy = calculateRefundPolicy(selectedTicket);

              return (
                <div className="space-y-4 text-sm">
                  {/* Chi tiết đơn hàng */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Mã vé:</span>
                      <span className="font-bold text-red-500">#{selectedTicket.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Khách hàng:</span>
                      <span className="font-semibold text-slate-200">{selectedTicket.customer} ({selectedTicket.phone})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tên phim:</span>
                      <span className="font-semibold text-slate-200">{selectedTicket.movie}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Suất chiếu:</span>
                      <span className="font-semibold text-slate-200">{selectedTicket.date} - {selectedTicket.time} ({selectedTicket.seats})</span>
                    </div>
                  </div>

                  {/* Cảnh báo điều kiện */}
                  <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${policy.tagStyle}`}>
                    <div className="flex items-center gap-1.5 font-bold text-sm">
                      <Info className="w-4 h-4 shrink-0" />
                      <span>{policy.tag}</span>
                    </div>
                    <p className="text-slate-300 pl-5">{policy.desc}</p>
                    {policy.hoursLeft > 0 && (
                      <p className="text-slate-400 pl-5 text-[11px]">
                        Thời gian tính tới suất chiếu: <b>{policy.hoursLeft} giờ</b>.
                      </p>
                    )}
                  </div>

                  {/* Tính toán tiền hoàn */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Giá vé ban đầu:</span>
                      <span className="font-semibold text-slate-200">{formatVND(selectedTicket.amount)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Tỷ lệ được hoàn:</span>
                      <span className="font-bold text-amber-400">{policy.rate}%</span>
                    </div>
                    <div className="border-t border-slate-800 pt-2 flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-300">Tổng tiền hoàn lại khách:</span>
                      <span className="text-xl font-extrabold text-emerald-400">
                        {formatVND(policy.refundAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Lý do hủy vé */}
                  {policy.canRefund && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-400">Lý do hủy vé / Hoàn tiền:</label>
                      <select
                        value={refundReason}
                        onChange={(e) => setRefundReason(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 outline-none focus:border-red-500"
                      >
                        <option value="Khách hàng yêu cầu hủy vé">Khách hàng yêu cầu hủy vé</option>
                        <option value="Khách bận lịch đột xuất">Khách bận lịch đột xuất</option>
                        <option value="Rạp thay đổi suất chiếu">Rạp thay đổi suất chiếu / Lỗi hệ thống</option>
                        <option value="Khác">Lý do khác</option>
                      </select>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
                    >
                      Quay lại
                    </button>
                    <button
                      disabled={!policy.canRefund}
                      onClick={handleConfirmRefund}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition shadow-lg ${
                        policy.canRefund
                          ? "bg-red-600 hover:bg-red-700 text-white shadow-red-600/20"
                          : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
                      }`}
                    >
                      Xác nhận hoàn tiền
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}