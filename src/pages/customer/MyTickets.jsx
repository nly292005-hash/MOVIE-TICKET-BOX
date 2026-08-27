import React, { useState, useEffect, useMemo } from "react";
import { Ticket, Clock, RotateCcw, X, Crown, Sparkles, RefreshCw } from "lucide-react";
import { useAuth } from "../../context/useAuth";

// IMPORT POSTER CÁC BỘ PHIM
import minecraft from "../../assets/images/minecraft.jpg";
import spiderman from "../../assets/images/spiderman.jpg";
import alien from "../../assets/images/alien.jpg";
import batman from "../../assets/images/batman.jpg";
import blackPanther from "../../assets/images/blackpanther.jpg";
import blackWidow from "../../assets/images/blackwidow.png";
import fnaf from "../../assets/images/fnaf.jpg";
import interstellar from "../../assets/images/interstellar.jpg";
import joker from "../../assets/images/joker.jpg";
import pacific from "../../assets/images/pacific.jpg";
import park from "../../assets/images/park.jpg";
import smile from "../../assets/images/smile.jpg";
import titanic from "../../assets/images/titanic.jpg";

function MyTickets() {
  const { user } = useAuth();
  
  // Kiểm tra quyền VIP của người dùng
  const isVipUser = Boolean(user?.isVip || user?.role === "VIP" || user?.vip);

  // Đổi key sang v6 để tự động xóa đệm cũ và load danh sách phim mới
  const storageKey = user ? `user_tickets_v6_${user.id || user.email}` : "user_tickets_v6_guest";
  const [filterTab, setFilterTab] = useState("ALL");

  const generateInitialTickets = (isVip) => {
    const now = new Date();

    const allTickets = [
      // --- 2 VÉ PHIM MỚI ĐANG CHIẾU SẮP TỚI (DÙNG ĐỂ TEST TÍNH NĂNG HOÀN VÉ) ---
      {
        id: "TK00204",
        movieTitle: "Minecraft Movie",
        poster: minecraft,
        showtime: new Date(now.getTime() + 36 * 60 * 60 * 1000).toISOString(),
        displayShowtime: "16/08/2026 - 19:10",
        seats: "J12, J13",
        amount: 220000,
        status: "PAID",
      },
      {
        id: "TK00203",
        movieTitle: "Spider-Man: Beyond the Spider-Verse",
        poster: spiderman,
        showtime: new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString(),
        displayShowtime: "17/08/2026 - 20:00",
        seats: "D5, D6",
        amount: 220000,
        status: "PAID",
      },

      // --- LỊCH SỬ VÉ ĐÃ CHIẾU ---
      {
        id: "TK00202",
        movieTitle: "Jurassic Park",
        poster: park,
        showtime: "2024-11-20T19:00:00.000Z",
        displayShowtime: "20/11/2024 - 19:00",
        seats: "G10, G11",
        amount: 180000,
        status: "PAID",
      },
      {
        id: "TK00201",
        movieTitle: "Pacific Rim",
        poster: pacific,
        showtime: "2024-10-12T20:00:00.000Z",
        displayShowtime: "12/10/2024 - 20:00",
        seats: "E8, E9",
        amount: 200000,
        status: "PAID",
      },
      {
        id: "TK00200",
        movieTitle: "Titanic",
        poster: titanic,
        showtime: "2024-02-14T18:30:00.000Z",
        displayShowtime: "14/02/2024 - 18:30",
        seats: "A1, A2 (VIP)",
        amount: 250000,
        status: "PAID",
      },
      {
        id: "TK00199",
        movieTitle: "Black Panther",
        poster: blackPanther,
        showtime: "2024-01-16T21:00:00.000Z",
        displayShowtime: "16/01/2024 - 21:00",
        seats: "H5, H6",
        amount: 190000,
        status: "PAID",
      },
      {
        id: "TK00198",
        movieTitle: "The Batman",
        poster: batman,
        showtime: "2023-12-04T19:30:00.000Z",
        displayShowtime: "04/12/2023 - 19:30",
        seats: "F12, F13",
        amount: 210000,
        status: "PAID",
      },
      {
        id: "TK00197",
        movieTitle: "Five Nights at Freddy's",
        poster: fnaf,
        showtime: "2023-10-27T20:30:00.000Z",
        displayShowtime: "27/10/2023 - 20:30",
        seats: "G7, G8",
        amount: 180000,
        status: "PAID",
      },
      {
        id: "TK00196",
        movieTitle: "Black Widow",
        poster: blackWidow,
        showtime: "2023-08-09T17:30:00.000Z",
        displayShowtime: "09/08/2023 - 17:30",
        seats: "E4, E5",
        amount: 200000,
        status: "PAID",
      },
      {
        id: "TK00195",
        movieTitle: "Joker: Folie à Deux",
        poster: joker,
        showtime: "2023-05-04T18:20:00.000Z",
        displayShowtime: "04/05/2023 - 18:20",
        seats: "F8, F9",
        amount: 190000,
        status: "PAID",
      },
      // ----------------- TẠI ĐÂY LÀ MỐC 10 VÉ DÀNH CHO MEMBER THƯỜNG -----------------
      {
        id: "TK00194",
        movieTitle: "Smile 2",
        poster: smile,
        showtime: "2023-03-18T22:30:00.000Z",
        displayShowtime: "18/03/2023 - 22:30",
        seats: "D1, D2",
        amount: 170000,
        status: "PAID",
      },
      {
        id: "TK00193",
        movieTitle: "Interstellar (IMAX)",
        poster: interstellar,
        showtime: "2022-11-10T19:00:00.000Z",
        displayShowtime: "10/11/2022 - 19:00",
        seats: "H10, H11",
        amount: 260000,
        status: "PAID",
      },
      {
        id: "TK00192",
        movieTitle: "Pacific Rim: Uprising",
        poster: pacific,
        showtime: "2022-09-15T20:15:00.000Z",
        displayShowtime: "15/09/2022 - 20:15",
        seats: "C5, C6",
        amount: 180000,
        status: "PAID",
      },
      {
        id: "TK00191",
        movieTitle: "The Batman (ScreenX)",
        poster: batman,
        showtime: "2022-06-20T18:00:00.000Z",
        displayShowtime: "20/06/2022 - 18:00",
        seats: "K8, K9",
        amount: 230000,
        status: "PAID",
      },
      {
        id: "TK00190",
        movieTitle: "Jurassic World",
        poster: park,
        showtime: "2022-04-12T21:30:00.000Z",
        displayShowtime: "12/04/2022 - 21:30",
        seats: "B3, B4",
        amount: 190000,
        status: "PAID",
      },
      {
        id: "TK00189",
        movieTitle: "Alien 3D",
        poster: alien,
        showtime: "2021-12-05T19:45:00.000Z",
        displayShowtime: "05/12/2021 - 19:45",
        seats: "F15, F16",
        amount: 220000,
        status: "PAID",
      },
      {
        id: "TK00188",
        movieTitle: "Titanic (3D Remastered)",
        poster: titanic,
        showtime: "2021-10-14T20:00:00.000Z",
        displayShowtime: "14/10/2021 - 20:00",
        seats: "G1, G2",
        amount: 240000,
        status: "PAID",
      },
      {
        id: "TK00187",
        movieTitle: "Black Panther: Wakanda Forever",
        poster: blackPanther,
        showtime: "2021-08-22T17:00:00.000Z",
        displayShowtime: "22/08/2021 - 17:00",
        seats: "D10, D11",
        amount: 200000,
        status: "PAID",
      },
      {
        id: "TK00186",
        movieTitle: "Black Widow (Gold Class)",
        poster: blackWidow,
        showtime: "2021-05-19T18:40:00.000Z",
        displayShowtime: "19/05/2021 - 18:40",
        seats: "VIP1, VIP2",
        amount: 300000,
        status: "PAID",
      },
      {
        id: "TK00185",
        movieTitle: "Joker",
        poster: joker,
        showtime: "2021-01-11T21:00:00.000Z",
        displayShowtime: "11/01/2021 - 21:00",
        seats: "E12, E13",
        amount: 180000,
        status: "PAID",
      },
    ];

    // Member: Lấy 10 vé | VIP: Lấy đủ 20 vé
    return isVip ? allTickets : allTickets.slice(0, 10);
  };

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved);
    return generateInitialTickets(isVipUser);
  });

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setTickets(JSON.parse(saved));
    } else {
      setTickets(generateInitialTickets(isVipUser));
    }
  }, [storageKey, isVipUser]);

  useEffect(() => {
    if (tickets) {
      localStorage.setItem(storageKey, JSON.stringify(tickets));
    }
  }, [tickets, storageKey]);

  const handleResetData = () => {
    const freshTickets = generateInitialTickets(isVipUser);
    setTickets(freshTickets);
    localStorage.setItem(storageKey, JSON.stringify(freshTickets));
  };

  const calculateRefund = (showtimeISO, amount) => {
    const now = new Date();
    const showtime = new Date(showtimeISO);
    const diffHours = (showtime.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (diffHours <= 0) {
      return {
        canRefund: false,
        rate: 0,
        refundAmount: 0,
        message: "Phim đã chiếu trong quá khứ, không thể hoàn vé.",
      };
    }

    if (diffHours >= 24) {
      return {
        canRefund: true,
        rate: 100,
        refundAmount: amount,
        message: "Yêu cầu trước 24h: Bạn nhận lại 100% tiền vé.",
      };
    } else if (diffHours >= 12) {
      return {
        canRefund: true,
        rate: 50,
        refundAmount: amount * 0.5,
        message: "Yêu cầu trước 12h - 24h: Bạn nhận lại 50% tiền vé.",
      };
    } else {
      return {
        canRefund: false,
        rate: 0,
        refundAmount: 0,
        message: "Vé sát giờ chiếu (< 12h) không thể hoàn hủy.",
      };
    }
  };

  const handleConfirmRefund = () => {
    if (!selectedTicket) return;

    const policy = calculateRefund(selectedTicket.showtime, selectedTicket.amount);
    if (!policy.canRefund) return;

    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id
          ? { ...t, status: "REFUNDED", refundAmount: policy.refundAmount }
          : t
      )
    );

    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const policy = calculateRefund(ticket.showtime, ticket.amount);
      if (filterTab === "CAN_REFUND") return ticket.status === "PAID" && policy.canRefund;
      if (filterTab === "EXPIRED") return ticket.status === "PAID" && !policy.canRefund;
      if (filterTab === "REFUNDED") return ticket.status === "REFUNDED";
      return true;
    });
  }, [tickets, filterTab]);

  const formatCurrency = (val) => new Intl.NumberFormat("vi-VN").format(val) + "đ";

  return (
    <div className="min-h-screen bg-[#0a0d1a] text-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#12172a] border border-slate-800 p-5 rounded-2xl">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Ticket className="text-red-500" /> Vé của tôi
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Quản lý danh sách vé đã đặt của tài khoản{" "}
              <span className="text-white font-semibold">{user?.name || "Khách"}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetData}
              title="Khôi phục danh sách vé mặc định"
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition border border-slate-700 flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Reset Vé
            </button>

            {isVipUser ? (
              <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/40 px-4 py-2 rounded-xl">
                <Crown className="w-5 h-5 text-amber-400 animate-bounce" />
                <div>
                  <div className="text-xs text-amber-300 font-bold flex items-center gap-1">
                    TÀI KHOẢN VIP <Sparkles className="w-3 h-3 text-yellow-400" />
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Quyền lợi VIP: <span className="font-bold text-white">{tickets.length}/20 vé</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-xl">
                <div>
                  <div className="text-xs text-slate-300 font-bold">MEMBER THƯỜNG</div>
                  <div className="text-[11px] text-slate-400">
                    Giới hạn: <span className="font-bold text-white">{tickets.length}/10 vé</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BỘ LỌC */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
          <button
            onClick={() => setFilterTab("ALL")}
            className={`px-4 py-2 rounded-lg transition whitespace-nowrap cursor-pointer ${
              filterTab === "ALL"
                ? "bg-red-600 text-white"
                : "bg-[#12172a] text-slate-400 hover:bg-slate-800"
            }`}
          >
            Tất cả ({tickets.length})
          </button>
          <button
            onClick={() => setFilterTab("CAN_REFUND")}
            className={`px-4 py-2 rounded-lg transition whitespace-nowrap cursor-pointer ${
              filterTab === "CAN_REFUND"
                ? "bg-red-600 text-white"
                : "bg-[#12172a] text-slate-400 hover:bg-slate-800"
            }`}
          >
            Có thể hoàn vé
          </button>
          <button
            onClick={() => setFilterTab("EXPIRED")}
            className={`px-4 py-2 rounded-lg transition whitespace-nowrap cursor-pointer ${
              filterTab === "EXPIRED"
                ? "bg-red-600 text-white"
                : "bg-[#12172a] text-slate-400 hover:bg-slate-800"
            }`}
          >
            Đã chiếu / Hết hạn
          </button>
          <button
            onClick={() => setFilterTab("REFUNDED")}
            className={`px-4 py-2 rounded-lg transition whitespace-nowrap cursor-pointer ${
              filterTab === "REFUNDED"
                ? "bg-red-600 text-white"
                : "bg-[#12172a] text-slate-400 hover:bg-slate-800"
            }`}
          >
            Đã hoàn tiền
          </button>
        </div>

        {/* DANH SÁCH VÉ */}
        <div className="space-y-4">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12 bg-[#12172a] border border-slate-800 rounded-xl text-slate-400 text-sm">
              Không tìm thấy vé xem phim nào trong mục này.
            </div>
          ) : (
            filteredTickets.map((ticket) => {
              const policy = calculateRefund(ticket.showtime, ticket.amount);
              const showYear = new Date(ticket.showtime).getFullYear();

              return (
                <div
                  key={ticket.id}
                  className="bg-[#12172a] border border-slate-800 hover:border-slate-700 transition rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={ticket.poster}
                      alt={ticket.movieTitle}
                      className="w-16 h-20 object-cover rounded-lg border border-slate-800"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-red-400 font-bold">#{ticket.id}</span>
                        {showYear < 2026 && (
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                            Vé {showYear}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                        {ticket.movieTitle}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {ticket.displayShowtime}
                      </p>
                      <p className="text-xs text-slate-300 mt-1">
                        Ghế: <span className="font-semibold text-white">{ticket.seats}</span> | Giá:{" "}
                        <span className="font-semibold text-emerald-400">
                          {formatCurrency(ticket.amount)}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end gap-2 w-full sm:w-auto justify-between sm:justify-center">
                    {ticket.status === "PAID" ? (
                      <button
                        onClick={() => {
                          if (policy.canRefund) {
                            setSelectedTicket(ticket);
                            setIsModalOpen(true);
                          }
                        }}
                        disabled={!policy.canRefund}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                          policy.canRefund
                            ? "bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white cursor-pointer"
                            : "bg-slate-800/80 text-slate-500 border border-slate-700/50 cursor-not-allowed opacity-75"
                        }`}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        {policy.canRefund ? "Yêu cầu hoàn vé" : "Không thể hoàn"}
                      </button>
                    ) : (
                      <span className="text-xs font-semibold px-3 py-1 bg-purple-950/80 text-purple-400 border border-purple-800/60 rounded-md">
                        Đã hoàn tiền ({formatCurrency(ticket.refundAmount)})
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* MODAL HOÀN VÉ */}
      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#12172a] border border-slate-800 rounded-2xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-lg">Xác nhận hoàn vé</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            {(() => {
              const policy = calculateRefund(selectedTicket.showtime, selectedTicket.amount);
              return (
                <div className="space-y-3 text-sm">
                  <p className="text-slate-300">
                    Bạn đang yêu cầu hủy vé xem phim <b>{selectedTicket.movieTitle}</b>.
                  </p>

                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1 text-xs">
                    <p className="text-slate-400">{policy.message}</p>
                    <p className="text-slate-200 font-medium">
                      Số tiền hoàn trả ({policy.rate}%):{" "}
                      <span className="text-emerald-400 font-bold">
                        {formatCurrency(policy.refundAmount)}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-semibold transition"
                    >
                      Quay lại
                    </button>
                    <button
                      onClick={handleConfirmRefund}
                      className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-xs font-bold transition"
                    >
                      Xác nhận hủy vé
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

export default MyTickets;