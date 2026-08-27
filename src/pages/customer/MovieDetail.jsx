import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import { movies } from "../../data/movies";
import { isLoggedIn } from "../../utils/auth"; // Helper kiểm tra trạng thái đăng nhập
import { getFavoriteMovieIds, onFavoritesChanged, toggleFavoriteMovie } from "../../utils/customerStorage";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((item) => String(item.id) === String(id));

  // Trạng thái yêu thích
  const [isFav, setIsFav] = useState(false);

  const dates = [
    { label: "Th. 08", value: "2026-08-12" },
    { label: "Th. 08", value: "2026-08-13" },
    { label: "Th. 08", value: "2026-08-14" },
  ];

  const showtimes = movie?.showtimes || [
    "09:10",
    "11:30",
    "13:50",
    "16:10",
    "18:40",
    "20:50",
    "22:30",
  ];

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(showtimes[0]);

  // Kiểm tra phim hiện tại có nằm trong danh sách Yêu thích không
  useEffect(() => {
    if (!movie) return;
    const syncFavorite = (ids = getFavoriteMovieIds()) => {
      setIsFav(ids.includes(String(movie.id)));
    };

    syncFavorite();
    return onFavoritesChanged(syncFavorite);
  }, [movie]);

  // Xử lý Thêm / Xóa Yêu thích
  const handleToggleFavorite = () => {
    if (!movie) return;

    // Nếu chưa đăng nhập -> Chuyển hướng tới Login
    if (typeof isLoggedIn === "function" && !isLoggedIn()) {
      navigate("/login", {
        state: { redirectTo: window.location.pathname },
      });
      return;
    }

    const updatedFavs = toggleFavoriteMovie(movie.id);
    setIsFav(updatedFavs.includes(String(movie.id)));
  };

  const dateLabel = useMemo(() => {
    return `${selectedDate.label} ${selectedDate.value.split("-")[2]}`;
  }, [selectedDate]);

  if (!movie) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-bold">Không tìm thấy phim</h1>
        <Link to="/" className="mt-5 inline-block text-red-500">
          ← Quay lại
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <section
        className="relative overflow-hidden rounded-[2rem] bg-slate-950/90 shadow-2xl shadow-black/40"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(2,6,23,0.95), rgba(2,6,23,0.72)), url(${movie.image || movie.poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[340px_1fr] lg:items-end">
            <div className="flex justify-center lg:justify-start">
              <img
                src={movie.poster}
                alt={movie.title}
                className="max-w-[340px] rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50"
              />
            </div>

            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full bg-red-600/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
                Phim đang chiếu
              </span>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  {movie.title}
                </h1>

                <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
                  {movie.tagline || movie.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-white/5 p-5">
                  <p className="text-sm uppercase text-slate-400">Thời lượng</p>
                  <p className="mt-2 text-xl font-semibold text-white">{movie.duration || "--"} phút</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-5">
                  <p className="text-sm uppercase text-slate-400">Độ tuổi</p>
                  <p className="mt-2 text-xl font-semibold text-white">{movie.ageRating || "P"}</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-5">
                  <p className="text-sm uppercase text-slate-400">Ngôn ngữ</p>
                  <p className="mt-2 text-xl font-semibold text-white">{movie.language || "Tiếng Anh"}</p>
                </div>
              </div>

              {/* NÚT HÀNH ĐỘNG: ĐẶT VÉ / YÊU THÍCH / TRAILER */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate(`/booking/${movie.id}?date=${selectedDate.value}&time=${selectedTime}`)}
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Đặt vé
                </button>

                {/* NÚT YÊU THÍCH */}
                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition ${
                    isFav
                      ? "border-red-500 bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      : "border-white/20 bg-white/5 text-white hover:border-red-500/50 hover:bg-white/10"
                  }`}
                >
                  <Heart className={`h-4 w-4 transition-colors ${isFav ? "fill-red-500 text-red-500" : "text-white"}`} />
                  <span>{isFav ? "Đã yêu thích" : "Yêu thích"}</span>
                </button>

                <a
                  href={movie.trailerUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Xem trailer
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION SUẤT CHIẾU */}
      <section className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-red-400">Lịch chiếu</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Chọn suất chiếu hôm nay</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {dates.map((item) => (
              <button
                type="button"
                key={item.value}
                onClick={() => setSelectedDate(item)}
                className={`rounded-3xl px-5 py-4 text-left text-sm font-semibold transition ${
                  selectedDate.value === item.value
                    ? "bg-red-600 text-white"
                    : "bg-slate-900 text-slate-300"
                }`}
              >
                <p className="text-xs uppercase text-slate-400">{item.label}</p>
                <p className="mt-1 text-lg font-bold">{item.value.split("-")[2]}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {showtimes.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => setSelectedTime(time)}
              className={`rounded-3xl border px-6 py-4 text-left text-lg font-semibold transition ${
                selectedTime === time
                  ? "border-red-500 bg-red-500/10 text-white"
                  : "border-white/10 bg-slate-900 text-slate-300 hover:border-red-500 hover:bg-slate-900/90"
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-[1.5rem] bg-slate-900/80 p-5 text-slate-300">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Suất chiếu đã chọn</p>
          <p className="mt-3 text-lg font-semibold text-white">{dateLabel} · {selectedTime}</p>
        </div>
      </section>
    </div>
  );
}

export default MovieDetail;