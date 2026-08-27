import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { movies } from "../../data/movies";
import { isLoggedIn } from "../../utils/auth";
import { bookSeats, getBookedSeats, onBookedSeatsChanged } from "../../utils/customerStorage";

// Import hình ảnh QR code từ thư mục assets
import qrImage from "../../assets/images/qr.png";

// Dữ liệu tĩnh
const cinemas = [
  { id: "beta", label: "Beta" },
  { id: "cgv", label: "CGV" },
  { id: "bhd", label: "BHD" },
  { id: "ncc", label: "NCC" },
];

const dateOptions = [
  { label: "12 Th. 08", value: "2026-08-12" },
  { label: "13 Th. 08", value: "2026-08-13" },
  { label: "14 Th. 08", value: "2026-08-14" },
];

const comboOptions = [
  { id: "combo2", label: "Combo 2 người", items: "Bỏng + Nước", price: 120000 },
  { id: "combo3", label: "Combo 3 người", items: "Bỏng + Nước + Snack", price: 170000 },
  { id: "combo6", label: "Combo 6 người", items: "2 Bỏng + 2 Nước + 2 Snack", price: 310000 },
];

const paymentMethods = [
  { id: "vietqr", label: "VietQR" },
  { id: "vnpay", label: "VNPAY" },
  { id: "momo", label: "MoMo" },
];

const seats = [
  "A1", "A2", "A3", "A4", "A5", "A6",
  "B1", "B2", "B3", "B4", "B5", "B6",
  "C1", "C2", "C3", "C4", "C5", "C6",
  "D1", "D2", "D3", "D4", "D5", "D6",
  "E1", "E2", "E3", "E4", "E5", "E6",
  "F1", "F2", "F3", "F4", "F5", "F6",
];

const ticketPrice = 70000;

function Booking() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialDate = query.get("date") || "2026-08-12";

  const movie = movies.find((item) => String(item.id) === String(movieId));
  const timeOptions = movie?.showtimes?.length ? movie.showtimes : ["09:10"];
  const requestedTime = query.get("time");
  const initialTime = requestedTime && timeOptions.includes(requestedTime)
    ? requestedTime
    : timeOptions[0];

  const [selectedCinema, setSelectedCinema] = useState(cinemas[0]);
  const [selectedDate, setSelectedDate] = useState(
    dateOptions.find((date) => date.value === initialDate) || dateOptions[0]
  );
  const [selectedTime, setSelectedTime] = useState(initialTime);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("vietqr");
  const [showQRCode, setShowQRCode] = useState(false);
  const [timer, setTimer] = useState(10);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    const savedBooking = location.state?.booking;
    if (!savedBooking) return;

    const cinema = cinemas.find((item) => item.label === savedBooking.cinema);
    const date = dateOptions.find((item) => item.value === savedBooking.date);

    if (cinema) setSelectedCinema(cinema);
    if (date) setSelectedDate(date);
    if (savedBooking.time) setSelectedTime(savedBooking.time);
    if (Array.isArray(savedBooking.seats)) setSelectedSeats(savedBooking.seats);

    if (savedBooking.combo) {
      const combo = comboOptions.find((item) => item.id === savedBooking.combo.id);
      if (combo) setSelectedCombo(combo);
    }

    if (savedBooking.method) {
      setSelectedMethod(savedBooking.method);
    }
  }, [location.state]);

  useEffect(() => {
    const showtime = {
      movieId,
      cinemaId: selectedCinema.id,
      date: selectedDate.value,
      time: selectedTime,
    };

    const syncBookedSeats = () => {
      const latestBookedSeats = getBookedSeats(showtime);
      setBookedSeats(latestBookedSeats);
      setSelectedSeats((current) =>
        current.filter((seat) => !latestBookedSeats.includes(seat))
      );
    };

    syncBookedSeats();
    return onBookedSeatsChanged(showtime, syncBookedSeats);
  }, [movieId, selectedCinema.id, selectedDate.value, selectedTime]);

  const seatTotal = selectedSeats.length * ticketPrice;
  const comboTotal = selectedCombo?.price || 0;
  const total = seatTotal + comboTotal;

  useEffect(() => {
    if (!showQRCode) {
      setTimer(10);
      return;
    }

    if (timer <= 0) {
      const result = bookSeats(
        {
          movieId,
          cinemaId: selectedCinema.id,
          date: selectedDate.value,
          time: selectedTime,
        },
        selectedSeats
      );

      if (!result.success) {
        setBookedSeats(result.bookedSeats);
        setSelectedSeats((current) =>
          current.filter((seat) => !result.conflicts.includes(seat))
        );
        setBookingError(
          `Ghế ${result.conflicts.join(", ")} vừa được người khác đặt. Vui lòng chọn ghế khác.`
        );
        setShowQRCode(false);
        setTimer(10);
        return;
      }

      // --- TỰ ĐỘNG LƯU VÉ VÀO DANH SÁCH "VÉ CỦA TÔI" (MyTickets) ---
      try {
        const savedUser = JSON.parse(localStorage.getItem("user") || "null");
        const userKey = savedUser?.id || savedUser?.email || "guest";
        const storageKey = `user_tickets_v6_${userKey}`;
        const existingTickets = JSON.parse(localStorage.getItem(storageKey) || "[]");

        const newTicket = {
          id: `TK${Math.floor(100000 + Math.random() * 900000)}`,
          movieTitle: movie.title,
          poster: movie.poster,
          showtime: `${selectedDate.value}T${selectedTime}:00.000Z`,
          displayShowtime: `${selectedDate.label} - ${selectedTime} (${selectedCinema.label})`,
          seats: selectedSeats.join(", "),
          amount: total,
          status: "PAID",
        };

        localStorage.setItem(storageKey, JSON.stringify([newTicket, ...existingTickets]));
      } catch (err) {
        console.error("Lỗi khi lưu lịch sử vé:", err);
      }

      navigate(`/success/${movieId}`, {
        state: {
          movie,
          cinema: selectedCinema.label,
          date: selectedDate.value,
          time: selectedTime,
          seats: selectedSeats,
          combo: selectedCombo,
          method: paymentMethods.find((method) => method.id === selectedMethod),
          total,
        },
      });
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [
    showQRCode,
    timer,
    navigate,
    movie,
    movieId,
    selectedCinema,
    selectedDate,
    selectedTime,
    selectedSeats,
    selectedCombo,
    selectedMethod,
    total,
  ]);

  const bookingData = {
    cinema: selectedCinema.label,
    date: selectedDate.value,
    time: selectedTime,
    seats: selectedSeats,
    combo: selectedCombo,
    method: selectedMethod,
    total,
  };

  const handleConfirmPayment = () => {
    if (!selectedSeats.length) return;

    const latestBookedSeats = getBookedSeats({
      movieId,
      cinemaId: selectedCinema.id,
      date: selectedDate.value,
      time: selectedTime,
    });
    const conflicts = selectedSeats.filter((seat) => latestBookedSeats.includes(seat));
    if (conflicts.length) {
      setBookedSeats(latestBookedSeats);
      setSelectedSeats((current) => current.filter((seat) => !conflicts.includes(seat)));
      setBookingError(`Ghế ${conflicts.join(", ")} vừa được người khác đặt. Vui lòng chọn ghế khác.`);
      return;
    }

    setBookingError("");

    if (!isLoggedIn()) {
      navigate("/login", {
        state: {
          redirectTo: `/booking/${movieId}?date=${selectedDate.value}&time=${selectedTime}`,
          booking: bookingData,
        },
      });
      return;
    }

    setShowQRCode(true);
  };

  const handlePaymentMethod = (methodId) => {
    setSelectedMethod(methodId);
    if (selectedSeats.length && isLoggedIn()) {
      setBookingError("");
      setShowQRCode(true);
      setTimer(10);
    }
  };

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats((current) =>
      current.includes(seat)
        ? current.filter((item) => item !== seat)
        : [...current, seat]
    );
  };

  const handleDateChange = (dateValue) => {
    setSelectedDate(dateOptions.find((item) => item.value === dateValue));
    setSelectedSeats([]);
    setShowQRCode(false);
    setBookingError("");
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setSelectedSeats([]);
    setShowQRCode(false);
    setBookingError("");
  };

  if (!movie) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-bold">Phim không tồn tại</h1>
        <p className="mt-2 text-slate-500">Vui lòng quay lại trang trước và chọn lại phim.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        
        {/* HEADER PHIM */}
        <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={movie.poster}
                alt={movie.title}
                className="h-28 w-20 rounded-3xl object-cover"
              />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-red-400">{movie.ageRating}</p>
                <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
                <p className="mt-1 text-sm text-slate-400">
                  {movie.duration} phút • {movie.language} • {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}
                </p>
              </div>
            </div>
            <div className="rounded-3xl bg-white/5 p-4 text-center">
              <p className="text-sm text-slate-400">Suất chiếu đã chọn</p>
              <p className="mt-2 text-lg font-semibold text-white">{selectedDate.label} · {selectedTime}</p>
            </div>
          </div>
        </div>

        {/* CHỌN RẠP, NGÀY & GIỜ */}
        <section className="rounded-[2rem] border border-slate-800 bg-slate-950 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-400">Chọn rạp</p>
              <h2 className="mt-2 text-2xl font-bold text-white">{selectedCinema.label}</h2>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {cinemas.map((cinema) => (
              <button
                key={cinema.id}
                onClick={() => { setSelectedCinema(cinema); setSelectedSeats([]); setShowQRCode(false); setBookingError(""); }}
                className={`rounded-3xl border px-5 py-4 text-sm font-semibold transition ${
                  selectedCinema.id === cinema.id
                    ? "border-red-500 bg-red-500/10 text-white"
                    : "border-slate-800 bg-slate-900 text-slate-300 hover:border-red-500 hover:bg-slate-900/90"
                }`}
              >
                {cinema.label}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {dateOptions.map((date) => (
              <button
                key={date.value}
                onClick={() => handleDateChange(date.value)}
                className={`rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                  selectedDate.value === date.value
                    ? "bg-red-600 text-white"
                    : "border border-slate-800 bg-slate-900 text-slate-300 hover:border-red-500"
                }`}
              >
                {date.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {timeOptions.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeChange(time)}
                className={`rounded-3xl border px-5 py-4 text-left transition ${
                  selectedTime === time
                    ? "border-red-500 bg-red-500/10 text-white"
                    : "border-slate-800 bg-slate-900 text-slate-300 hover:border-red-500 hover:bg-slate-900/90"
                }`}
              >
                <p className="text-sm text-slate-400">Rạp {cinemas.find((c) => c.id === selectedCinema.id)?.label || "–"}</p>
                <p className="mt-2 text-2xl font-semibold">{time}</p>
              </button>
            ))}
          </div>
        </section>

        {/* SƠ ĐỒ CHỌN GHẾ */}
        <section className="rounded-[2rem] border border-slate-800 bg-slate-950 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-400">Chọn ghế</p>
          <p className="mt-2 text-white">Chỉ chọn rạp và ghế tại đây, combo sẽ thêm vào vé.</p>
          {bookingError && (
            <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {bookingError}
            </p>
          )}

          <div className="mt-8">
            <div className="mb-8">
              <div className="h-2 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
              <p className="mt-3 text-center text-xs text-slate-500">MÀN HÌNH</p>
            </div>

            <div className="grid grid-cols-6 gap-3">
              {seats.map((seat) => {
                const isBooked = bookedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);
                return (
                  <button
                    key={seat}
                    onClick={() => toggleSeat(seat)}
                    disabled={isBooked}
                    className={`rounded-lg py-3 text-sm font-semibold transition ${
                      isBooked
                        ? "cursor-not-allowed bg-slate-800 text-slate-600"
                        : isSelected
                          ? "bg-red-600 text-white"
                          : "border border-slate-700 bg-slate-900 text-slate-400 hover:border-red-500"
                    }`}
                  >
                    {seat}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-slate-500">
              <span>🟥 Đang chọn</span>
              <span>⬛ Đã đặt</span>
              <span>⬜ Còn trống</span>
            </div>
          </div>
        </section>

        {/* THÊM BẮP NƯỚC (COMBO) */}
        <section className="rounded-[2rem] border border-slate-800 bg-slate-950 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-400">Combo</p>
              <h2 className="mt-2 text-2xl font-bold text-white">Thêm bỏng + nước</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {comboOptions.map((combo) => (
              <button
                key={combo.id}
                onClick={() => setSelectedCombo(selectedCombo?.id === combo.id ? null : combo)}
                className={`rounded-3xl border px-5 py-5 text-left transition ${
                  selectedCombo?.id === combo.id
                    ? "border-red-500 bg-red-500/10 text-white"
                    : "border-slate-800 bg-slate-900 text-slate-300 hover:border-red-500 hover:bg-slate-900/90"
                }`}
              >
                <p className="text-sm text-slate-400">{combo.label}</p>
                <p className="mt-3 font-semibold text-white">{combo.items}</p>
                <p className="mt-4 text-lg font-bold text-red-500">{combo.price.toLocaleString("vi-VN")}đ</p>
              </button>
            ))}
          </div>
        </section>

        {/* TỔNG KẾT VÀ BẮT ĐẦU THANH TOÁN */}
        <section className="rounded-[2rem] border border-slate-800 bg-slate-950 p-6">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-900 p-5">
                <p className="text-sm uppercase text-slate-400">Phim</p>
                <p className="mt-2 font-semibold text-white">{movie.title}</p>
              </div>
              <div className="rounded-3xl bg-slate-900 p-5">
                <p className="text-sm uppercase text-slate-400">Rạp</p>
                <p className="mt-2 font-semibold text-white">{selectedCinema.label}</p>
              </div>
              <div className="rounded-3xl bg-slate-900 p-5">
                <p className="text-sm uppercase text-slate-400">Ngày</p>
                <p className="mt-2 font-semibold text-white">{selectedDate.label}</p>
              </div>
              <div className="rounded-3xl bg-slate-900 p-5">
                <p className="text-sm uppercase text-slate-400">Suất chiếu</p>
                <p className="mt-2 font-semibold text-white">{selectedTime}</p>
              </div>
              <div className="rounded-3xl bg-slate-900 p-5">
                <p className="text-sm uppercase text-slate-400">Ghế đã chọn</p>
                <p className="mt-2 font-semibold text-white">{selectedSeats.length ? selectedSeats.join(", ") : "Chưa chọn ghế"}</p>
              </div>
              <div className="rounded-3xl bg-slate-900 p-5">
                <p className="text-sm uppercase text-slate-400">Combo</p>
                <p className="mt-2 font-semibold text-white">{selectedCombo ? selectedCombo.label : "Không có"}</p>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-900 p-5 flex flex-col justify-between">
              <div>
                <p className="text-sm uppercase text-slate-400">Tổng tiền</p>
                <p className="mt-2 text-3xl font-bold text-red-500">{total.toLocaleString("vi-VN")}đ</p>
                <p className="mt-4 text-sm text-slate-400">{selectedSeats.length} ghế đã chọn</p>
              </div>
              <button
                disabled={!selectedSeats.length}
                onClick={handleConfirmPayment}
                className="mt-6 w-full rounded-3xl bg-red-600 px-5 py-4 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-red-700 cursor-pointer"
              >
                Tiếp tục thanh toán
              </button>
            </div>
          </div>
        </section>

        {/* PHƯƠNG THỨC THANH TOÁN */}
        {!showQRCode && (
          <section className="rounded-[2rem] border border-slate-800 bg-slate-950 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-400">Phương thức thanh toán</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentMethod(method.id)}
                  className={`rounded-3xl border px-5 py-5 text-center text-sm font-semibold transition cursor-pointer ${
                    selectedMethod === method.id
                      ? "border-red-500 bg-red-500/10 text-white"
                      : "border-slate-800 bg-slate-900 text-slate-300 hover:border-red-500 hover:bg-slate-900/90"
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* HIỂN THỊ MÃ QR THANH TOÁN */}
        {showQRCode && (
          <section className="rounded-[2rem] border border-slate-800 bg-slate-950 p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-blue-400">Quét mã QR</p>
                <h2 className="mt-2 text-3xl font-bold text-white">Sử dụng {paymentMethods.find((method) => method.id === selectedMethod)?.label}</h2>
              </div>
              <p className="rounded-3xl bg-slate-900 px-5 py-3 text-sm text-slate-300">
                Tự động hoàn tất trong <span className="text-red-500 font-bold">{timer}s</span>
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-3xl bg-slate-900 p-8">
              <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-6 shadow-2xl shadow-black/20">
                <img 
                  src={qrImage} 
                  alt="Mã QR thanh toán" 
                  className="h-60 w-60 rounded-xl object-contain"
                />
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-800">MÃ QR THANH TOÁN</p>
                <p className="mt-1 text-sm font-medium text-slate-600">Quét mã để xác nhận đặt vé</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Booking;