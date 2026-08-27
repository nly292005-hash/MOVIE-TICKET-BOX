import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Search, X } from "lucide-react";
import { movies } from "../../data/movies";
import { isLoggedIn } from "../../utils/auth"; // Giả định helper kiểm tra đăng nhập
import { getFavoriteMovieIds, onFavoritesChanged, toggleFavoriteMovie } from "../../utils/customerStorage";

function SearchMovie() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Lấy danh sách phim yêu thích từ localStorage
  useEffect(() => {
    setFavorites(getFavoriteMovieIds());
    return onFavoritesChanged(setFavorites);
  }, []);

  // Xử lý Thêm / Xóa Yêu thích
  const handleToggleFavorite = (e, movieId) => {
    e.preventDefault(); // Tránh kích hoạt sự kiện click của thẻ <Link>
    e.stopPropagation();

    // Nếu chưa đăng nhập -> Chuyển hướng
    if (typeof isLoggedIn === "function" && !isLoggedIn()) {
      navigate("/login", {
        state: { redirectTo: window.location.pathname },
      });
      return;
    }

    const updatedFavorites = toggleFavoriteMovie(movieId);
    setFavorites(updatedFavorites);
  };

  // Lọc danh sách phim theo từ khóa
  const result = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword.toLowerCase().trim())
  );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-white">Tìm kiếm phim</h1>
        <p className="mt-2 text-slate-500">
          Tìm bộ phim bạn muốn xem.
        </p>
      </div>

      {/* INPUT SEARCH */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Nhập tên phim..."
          className="w-full rounded-xl border border-slate-700 bg-slate-900 pl-12 pr-12 py-4 text-white outline-none transition focus:border-red-500"
        />

        {/* Nút xóa từ khóa nhanh */}
        {keyword && (
          <button
            type="button"
            onClick={() => setKeyword("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* SỐ LƯỢNG KẾT QUẢ */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Tìm thấy <span className="font-semibold text-white">{result.length}</span> phim
          {keyword && (
            <span>
              {" "}cho từ khóa "<span className="text-red-400">{keyword}</span>"
            </span>
          )}
        </p>
      </div>

      {/* TRẠNG THÁI KHÔNG TÌM THẤY KẾT QUẢ */}
      {result.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center text-slate-500">
          <p className="text-lg">Không tìm thấy bộ phim nào phù hợp.</p>
          <p className="mt-1 text-sm">Hãy thử tìm kiếm bằng từ khóa khác!</p>
        </div>
      ) : (
        /* GRID DANH SÁCH PHIM */
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-6">
          {result.map((movie) => {
            const isFav = favorites.includes(String(movie.id));

            return (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="group relative flex flex-col"
              >
                {/* Poster & Nút Yêu Thích */}
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-slate-800">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  {/* Nút Trái tim thả tim */}
                  <button
                    type="button"
                    onClick={(e) => handleToggleFavorite(e, movie.id)}
                    className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white transition hover:bg-black/80 hover:scale-110 active:scale-95"
                    title={isFav ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
                  >
                    <Heart
                      className={`h-4 w-4 transition-colors ${
                        isFav ? "fill-red-500 text-red-500" : "text-white"
                      }`}
                    />
                  </button>
                </div>

                {/* Tên Phim */}
                <h2 className="mt-3 truncate font-semibold text-white transition group-hover:text-red-500">
                  {movie.title}
                </h2>

                {/* Rating */}
                <p className="mt-1 flex items-center gap-1 text-xs text-yellow-400">
                  ★ <span className="text-slate-400">{movie.rating}</span>
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchMovie;