import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { movies } from "../../data/movies";
import {
  getFavoriteMovieIds,
  onFavoritesChanged,
  toggleFavoriteMovie,
} from "../../utils/customerStorage";
import { useAuth } from "../../context/useAuth"; // 1. Import hook xác thực người dùng

function Favorites() {
  const { user } = useAuth(); // 2. Lấy thông tin user hiện tại
  
  // Xác định định danh tài khoản (nếu chưa đăng nhập thì dùng 'guest')
  const userId = user?.id || user?.email || "guest";

  const [favoriteIds, setFavoriteIds] = useState(() => getFavoriteMovieIds(userId));

  // 3. Tự động cập nhật danh sách phim yêu thích mỗi khi đổi tài khoản
  useEffect(() => {
    setFavoriteIds(getFavoriteMovieIds(userId));
    
    // Nếu hàm onFavoritesChanged hỗ trợ callback theo userId
    const cleanup = onFavoritesChanged ? onFavoritesChanged(setFavoriteIds, userId) : undefined;
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, [userId]);

  const favoriteMovies = movies.filter((movie) =>
    favoriteIds.includes(String(movie.id))
  );

  const handleRemoveFavorite = (event, movieId) => {
    event.preventDefault();
    event.stopPropagation();
    
    // 4. Truyền userId vào hàm toggle để lưu đúng bộ nhớ của tài khoản đó
    const updatedIds = toggleFavoriteMovie(movieId, userId);
    setFavoriteIds(updatedIds);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Phim yêu thích</h1>
        <p className="mt-2 text-slate-500">
          Những bộ phim bạn đã lưu {user?.name ? `(${user.name})` : ""}.
        </p>
      </div>

      {favoriteMovies.length ? (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {favoriteMovies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`} className="group">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="aspect-[2/3] w-full object-cover transition group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={(event) => handleRemoveFavorite(event, movie.id)}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-red-500 transition hover:scale-110"
                  title="Bỏ yêu thích"
                >
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                </button>
              </div>
              <h2 className="mt-3 font-semibold group-hover:text-red-500">
                {movie.title}
              </h2>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-10 text-center text-slate-400">
          Bạn chưa có phim yêu thích nào.
        </div>
      )}
    </div>
  );
}

export default Favorites;