import { useLocation, useNavigate, useParams } from "react-router-dom";

function Success() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state || {};

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-slate-900/90 p-10 shadow-2xl shadow-black/40">
        <div className="space-y-6 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-400">Đặt vé thành công</p>
          <h1 className="text-4xl font-bold">Chúc mừng! Bạn đã đặt vé thành công.</h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-300">
            Mã vé của bạn đã được ghi nhận. Vui lòng đến rạp trước 15 phút để hoàn tất thủ tục nhận vé.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-950 p-6">
            <p className="text-sm uppercase text-slate-400">Phim</p>
            <p className="mt-3 text-lg font-semibold text-white">{booking.movie?.title || `Phim ${movieId}`}</p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-6">
            <p className="text-sm uppercase text-slate-400">Rạp</p>
            <p className="mt-3 text-lg font-semibold text-white">{booking.cinema || "-"}</p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-6">
            <p className="text-sm uppercase text-slate-400">Ngày</p>
            <p className="mt-3 text-lg font-semibold text-white">{booking.date || "-"}</p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-6">
            <p className="text-sm uppercase text-slate-400">Giờ</p>
            <p className="mt-3 text-lg font-semibold text-white">{booking.time || "-"}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-950 p-6">
            <p className="text-sm uppercase text-slate-400">Ghế</p>
            <p className="mt-3 text-lg font-semibold text-white">{booking.seats?.join(", ") || "-"}</p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-6">
            <p className="text-sm uppercase text-slate-400">Combo</p>
            <p className="mt-3 text-lg font-semibold text-white">{booking.combo?.label || "Không có"}</p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-slate-950 p-6">
          <p className="text-sm uppercase text-slate-400">Tổng thanh toán</p>
          <p className="mt-3 text-3xl font-bold text-red-500">{booking.total?.toLocaleString("vi-VN") || "0"}đ</p>
          <p className="mt-4 text-sm text-slate-300">Cảm ơn bạn đã chọn sử dụng dịch vụ.</p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate("/")}
            className="rounded-3xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Về trang chủ
          </button>
          <button
            onClick={() => navigate("/my-tickets")}
            className="rounded-3xl border border-white/10 bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Xem vé của tôi
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;
