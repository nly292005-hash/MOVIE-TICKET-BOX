import { useLocation, useNavigate, useParams } from "react-router-dom";
import { movies } from "../../data/movies";

const paymentMethods = [
  { id: "vietqr", label: "VietQR" },
  { id: "vnpay", label: "VNPAY" },
  { id: "viettel", label: "Viettel Money" },
  { id: "momo", label: "MoMo" },
];

function Payment() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state || {};
  const movie = movies.find((item) => String(item.id) === String(movieId));
  const selectedMethod = paymentMethods[0];

  if (!movie || !booking.showtime || !booking.seats?.length) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-bold text-white">Không có dữ liệu thanh toán</h1>
        <p className="mt-3 text-slate-400">Vui lòng quay lại trang đặt vé và chọn lại suất chiếu.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 rounded-lg bg-red-600 px-6 py-3 text-white"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-400">Thanh toán</p>
            <h1 className="mt-3 text-4xl font-bold text-white">Hoàn tất đơn đặt vé</h1>
          </div>
          <div className="rounded-3xl bg-slate-950 px-5 py-4 text-slate-300 shadow-xl shadow-black/20">
            <p className="text-sm text-slate-400">PT Thanh toán</p>
            <p className="mt-2 text-lg font-semibold text-white">{selectedMethod.label}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.95fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-7 shadow-xl shadow-black/20">
              <h2 className="text-xl font-semibold text-white">Thông tin phim</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900 p-5">
                  <p className="text-sm text-slate-400">Phim</p>
                  <p className="mt-2 text-base font-semibold text-white">{movie.title}</p>
                </div>
                <div className="rounded-3xl bg-slate-900 p-5">
                  <p className="text-sm text-slate-400">Ngày giờ chiếu</p>
                  <p className="mt-2 text-base font-semibold text-white">{booking.showtime.time} - {booking.date}</p>
                </div>
                <div className="rounded-3xl bg-slate-900 p-5">
                  <p className="text-sm text-slate-400">Ghế</p>
                  <p className="mt-2 text-base font-semibold text-white">{booking.seats.join(", ")}</p>
                </div>
                <div className="rounded-3xl bg-slate-900 p-5">
                  <p className="text-sm text-slate-400">Phòng chiếu</p>
                  <p className="mt-2 text-base font-semibold text-white">{booking.showtime.hall}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-7 shadow-xl shadow-black/20">
              <h2 className="text-xl font-semibold text-white">Phương thức thanh toán</h2>
              <div className="mt-5 space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`rounded-3xl border p-4 ${
                      method.id === selectedMethod.id
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-slate-800 bg-slate-900"
                    }`}
                  >
                    <p className="font-semibold text-white">{method.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-7 shadow-xl shadow-black/20">
              <h2 className="text-xl font-semibold text-white">Thông tin thanh toán</h2>
              <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-5">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Ghế ({booking.seats.length})</span>
                    <span>{(booking.seats.length * booking.price).toLocaleString("vi-VN")}đ</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Phí</span>
                    <span>0đ</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Giảm giá</span>
                    <span>0đ</span>
                  </div>
                </div>
                <div className="mt-5 border-t border-slate-800 pt-5">
                  <div className="flex items-center justify-between text-lg font-semibold text-white">
                    <span>Tổng cộng</span>
                    <span>{(booking.seats.length * booking.price).toLocaleString("vi-VN")}đ</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/my-tickets")}
                className="mt-5 w-full rounded-3xl bg-red-600 px-5 py-4 text-sm font-semibold text-white hover:bg-red-700"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
