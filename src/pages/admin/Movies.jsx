import React, { useState, useEffect } from "react";
// 🛑 LƯU Ý: Điều chỉnh đường dẫn import này cho đúng với file dữ liệu của bạn
import { movies as initialMovies } from "../../data/movies";

function AdminMovies() {
  // 1. Khởi tạo danh sách phim từ LocalStorage hoặc lấy từ dữ liệu mẫu gốc
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("admin_movies");
    return savedMovies ? JSON.parse(savedMovies) : initialMovies;
  });

  // Tự động lưu vào LocalStorage mỗi khi danh sách phim thay đổi
  useEffect(() => {
    localStorage.setItem("admin_movies", JSON.stringify(movies));
  }, [movies]);

  // State Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  // State Form khớp 100% với cấu trúc Object phim của bạn
  const [formData, setFormData] = useState({
    movieName: "",
    title: "",
    tagline: "",
    poster: "",
    image: "",
    rating: 8.0,
    duration: 120,
    director: "",
    cast: "", // Dạng chuỗi phân cách bởi dấu phẩy khi nhập
    releaseDate: "",
    language: "Tiếng Anh",
    ageRating: "P",
    genre: "", // Dạng chuỗi phân cách bởi dấu phẩy khi nhập
    description: "",
    trailerUrl: "",
    showtimes: "09:00, 13:00, 17:00, 20:00", // Dạng chuỗi khi nhập
  });

  // 📸 CHỌN ANH TỪ MÁY TÍNH
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file hình ảnh!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          poster: reader.result,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Mở modal thêm mới
  const handleOpenAddModal = () => {
    setEditingMovie(null);
    setFormData({
      movieName: "",
      title: "",
      tagline: "",
      poster: "",
      image: "",
      rating: 8.0,
      duration: 120,
      director: "",
      cast: "",
      releaseDate: "",
      language: "Tiếng Anh",
      ageRating: "P",
      genre: "Action, Adventure",
      description: "",
      trailerUrl: "",
      showtimes: "09:00, 13:00, 17:00, 20:00",
    });
    setIsModalOpen(true);
  };

  // Mở modal chỉnh sửa
  const handleOpenEditModal = (movie) => {
    setEditingMovie(movie);
    setFormData({
      ...movie,
      cast: Array.isArray(movie.cast) ? movie.cast.join(", ") : movie.cast,
      genre: Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre,
      showtimes: Array.isArray(movie.showtimes)
        ? movie.showtimes.join(", ")
        : movie.showtimes,
    });
    setIsModalOpen(true);
  };

  // Xử lý Submit Form Thêm/Sửa
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.poster) {
      alert("Vui lòng chọn hoặc tải ảnh poster phim!");
      return;
    }

    // Biến đổi các chuỗi phân cách dấu phẩy thành Array chuẩn
    const formattedData = {
      ...formData,
      cast: typeof formData.cast === "string" ? formData.cast.split(",").map((s) => s.trim()) : formData.cast,
      genre: typeof formData.genre === "string" ? formData.genre.split(",").map((s) => s.trim()) : formData.genre,
      showtimes: typeof formData.showtimes === "string" ? formData.showtimes.split(",").map((s) => s.trim()) : formData.showtimes,
      duration: Number(formData.duration),
      rating: Number(formData.rating),
    };

    if (editingMovie) {
      setMovies(
        movies.map((m) =>
          m.id === editingMovie.id ? { ...formattedData, id: m.id } : m
        )
      );
    } else {
      setMovies([
        ...movies,
        {
          ...formattedData,
          id: String(Date.now()),
        },
      ]);
    }
    setIsModalOpen(false);
  };

  // Xóa phim
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phim này khỏi hệ thống?")) {
      setMovies(movies.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Phim ({movies.length})</h1>
          <p className="text-sm text-slate-400">
            Danh sách phim đang đồng bộ với dữ liệu hiển thị toàn hệ thống
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 shadow-lg shadow-red-600/20"
        >
          + Thêm phim mới
        </button>
      </div>

      {/* DANH SÁCH PHIM */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="group overflow-hidden rounded-xl border border-slate-800 bg-slate-900 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
                <img
                  src={movie.poster || movie.image}
                  alt={movie.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 rounded-md bg-black/70 px-2 py-1 text-xs font-bold text-amber-400 backdrop-blur">
                  ⭐ {movie.rating}
                </div>
                <div className="absolute top-2 left-2 rounded-md bg-red-600 px-2 py-1 text-[10px] font-bold text-white uppercase">
                  {movie.ageRating}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-white truncate">{movie.title}</h3>
                <p className="text-xs text-slate-400 truncate italic mt-0.5">
                  "{movie.tagline}"
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {(Array.isArray(movie.genre) ? movie.genre : [movie.genre]).map(
                    (g, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300"
                      >
                        {g}
                      </span>
                    )
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80 pt-2">
                  <span>⏱️ {movie.duration} phút</span>
                  <span>📅 {movie.releaseDate}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <div className="flex gap-2 border-t border-slate-800 pt-3">
                <button
                  onClick={() => handleOpenEditModal(movie)}
                  className="flex-1 rounded bg-slate-800 py-1.5 text-xs font-semibold hover:bg-slate-700 transition"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="flex-1 rounded bg-red-500/10 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL THÊM / SỬA PHIM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl my-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingMovie ? `Chỉnh sửa: ${editingMovie.title}` : "Thêm phim mới"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Tên phim (movieName)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.movieName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        movieName: e.target.value,
                        title: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-red-500"
                    placeholder="VD: Attack on Titan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Đạo diễn (director)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.director}
                    onChange={(e) =>
                      setFormData({ ...formData, director: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-red-500"
                    placeholder="VD: James Cameron"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Slogan / Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) =>
                    setFormData({ ...formData, tagline: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-red-500"
                  placeholder="Cuộc chiến sinh tử giữa người và Titan..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Đánh giá (rating)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Thời lượng (phút)
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Độ tuổi (ageRating)
                  </label>
                  <select
                    value={formData.ageRating}
                    onChange={(e) =>
                      setFormData({ ...formData, ageRating: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-red-500"
                  >
                    <option value="P">P (Mọi lứa tuổi)</option>
                    <option value="C13">C13 (Trên 13 tuổi)</option>
                    <option value="C16">C16 (Trên 16 tuổi)</option>
                    <option value="C18">C18 (Trên 18 tuổi)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Thể loại (cách nhau dấu phẩy)
                  </label>
                  <input
                    type="text"
                    value={formData.genre}
                    onChange={(e) =>
                      setFormData({ ...formData, genre: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-red-500"
                    placeholder="Action, Fantasy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Diễn viên (cách nhau dấu phẩy)
                  </label>
                  <input
                    type="text"
                    value={formData.cast}
                    onChange={(e) =>
                      setFormData({ ...formData, cast: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-red-500"
                    placeholder="Eren, Mikasa, Levi"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Ngày khởi chiếu (DD/MM/YYYY)
                  </label>
                  <input
                    type="text"
                    value={formData.releaseDate}
                    onChange={(e) =>
                      setFormData({ ...formData, releaseDate: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-red-500"
                    placeholder="01/07/2026"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Ngôn ngữ
                  </label>
                  <input
                    type="text"
                    value={formData.language}
                    onChange={(e) =>
                      setFormData({ ...formData, language: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-red-500"
                    placeholder="Tiếng Nhật / Vietsub"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Suất chiếu (showtimes - cách nhau dấu phẩy)
                </label>
                <input
                  type="text"
                  value={formData.showtimes}
                  onChange={(e) =>
                    setFormData({ ...formData, showtimes: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-red-500"
                  placeholder="09:10, 12:50, 16:30, 20:10"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Link Trailer YouTube
                </label>
                <input
                  type="text"
                  value={formData.trailerUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, trailerUrl: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-red-500"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Mô tả phim (description)
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-red-500"
                  placeholder="Nội dung tóm tắt phim..."
                />
              </div>

              {/* KHU VỰC CHỌN ANH POSTER */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Poster Phim (Chọn ảnh từ máy tính)
                </label>
                <div className="mt-1 flex items-center gap-4">
                  <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-lg border border-dashed border-slate-700 bg-slate-950 flex items-center justify-center">
                    {formData.poster || formData.image ? (
                      <img
                        src={formData.poster || formData.image}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] text-slate-500 text-center px-1">
                        Chưa chọn ảnh
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      id="poster-upload"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="poster-upload"
                      className="inline-block cursor-pointer rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-700"
                    >
                      📁 Tải ảnh từ máy tính
                    </label>
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-500"
                >
                  {editingMovie ? "Lưu thay đổi" : "Thêm phim mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminMovies;