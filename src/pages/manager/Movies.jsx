import { useState } from "react";
import { movies as initialMovies } from "../../data/movies";
import Modal from "../../components/Modal";

function Movies() {
  const [movieList, setMovieList] = useState(initialMovies);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // State quản lý dữ liệu nhập trong Modal
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    duration: "",
    rating: "",
    poster: "",
    status: "now-showing",
  });

  // Tìm kiếm phim theo tên
  const filteredMovies = movieList.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  // Mở modal Thêm phim mới
  const handleOpenAddModal = () => {
    setSelectedMovie(null);
    setFormData({
      title: "",
      genre: "",
      duration: "",
      rating: "",
      poster: "",
      status: "now-showing",
    });
    setIsModalOpen(true);
  };

  // Mở modal Sửa phim
  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      title: movie.title || "",
      genre: Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre || "",
      duration: movie.duration || "",
      rating: movie.rating || "",
      poster: movie.poster || "",
      status: movie.status || "now-showing",
    });
    setIsModalOpen(true);
  };

  // Xóa phim
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa phim này?");
    if (!confirmDelete) return;

    setMovieList(movieList.filter((movie) => movie.id !== id));
  };

  // Lắng nghe thay đổi ở các input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý khi nhấn nút Lưu (Thêm mới hoặc Cập nhật)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Chuyển chuỗi thể loại "Hành động, Hài" thành mảng ["Hành động", "Hài"]
    const genreArray = typeof formData.genre === "string"
      ? formData.genre.split(",").map((g) => g.trim()).filter(Boolean)
      : formData.genre;

    if (selectedMovie) {
      // Cập nhật phim hiện tại
      setMovieList((prev) =>
        prev.map((movie) =>
          movie.id === selectedMovie.id
            ? {
                ...movie,
                ...formData,
                genre: genreArray,
                duration: Number(formData.duration) || 0,
                rating: Number(formData.rating) || 0,
              }
            : movie
        )
      );
    } else {
      // Thêm phim mới vào đầu danh sách
      const newMovie = {
        id: String(Date.now()), // Tạo ID duy nhất bằng timestamp
        ...formData,
        genre: genreArray,
        duration: Number(formData.duration) || 0,
        rating: Number(formData.rating) || 0,
      };
      setMovieList((prev) => [newMovie, ...prev]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Quản lý phim</h1>
          <p className="mt-2 text-slate-500">
            Quản lý danh sách phim trong hệ thống.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          + Thêm phim
        </button>
      </div>

      {/* SEARCH */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <input
          type="text"
          placeholder="Tìm kiếm phim..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-red-500"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-800 bg-slate-950">
              <tr>
                <th className="px-5 py-4 text-xs text-slate-500">Phim</th>
                <th className="px-5 py-4 text-xs text-slate-500">Thể loại</th>
                <th className="px-5 py-4 text-xs text-slate-500">Thời lượng</th>
                <th className="px-5 py-4 text-xs text-slate-500">Rating</th>
                <th className="px-5 py-4 text-xs text-slate-500">Trạng thái</th>
                <th className="px-5 py-4 text-xs text-slate-500">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800 text-white">
              {filteredMovies.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    Không tìm thấy phim phù hợp.
                  </td>
                </tr>
              ) : (
                filteredMovies.map((movie) => (
                  <tr key={movie.id} className="hover:bg-slate-800/50 transition">
                    {/* MOVIE */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={movie.poster || "https://via.placeholder.com/150"}
                          alt={movie.title}
                          className="h-16 w-11 rounded object-cover bg-slate-800"
                        />
                        <div>
                          <p className="font-semibold">{movie.title}</p>
                          <p className="mt-1 text-xs text-slate-500">ID: {movie.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* GENRE */}
                    <td className="px-5 py-4 text-sm text-slate-400">
                      {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}
                    </td>

                    {/* DURATION */}
                    <td className="px-5 py-4 text-sm text-slate-400">
                      {movie.duration} phút
                    </td>

                    {/* RATING */}
                    <td className="px-5 py-4">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1">{movie.rating}</span>
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-md px-3 py-1 text-xs font-semibold ${
                          movie.status === "now-showing"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        {movie.status === "now-showing" ? "Đang chiếu" : "Sắp chiếu"}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(movie)}
                          className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(movie.id)}
                          className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-500/20"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL THÊM / SỬA PHIM */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedMovie ? "Chỉnh sửa phim" : "Thêm phim mới"}
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Tên phim */}
          <div>
            <label className="mb-2 block text-sm text-slate-400">Tên phim</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-red-500"
              placeholder="Nhập tên phim"
            />
          </div>

          {/* Đường dẫn poster */}
          <div>
            <label className="mb-2 block text-sm text-slate-400">Link Poster (URL)</label>
            <input
              type="text"
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-red-500"
              placeholder="https://example.com/poster.jpg"
            />
          </div>

          {/* Thể loại */}
          <div>
            <label className="mb-2 block text-sm text-slate-400">Thể loại (ngăn cách bởi dấu phẩy)</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-red-500"
              placeholder="Hành động, Viễn tưởng, Drama..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Thời lượng */}
            <div>
              <label className="mb-2 block text-sm text-slate-400">Thời lượng (phút)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-red-500"
                placeholder="120"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="mb-2 block text-sm text-slate-400">Rating</label>
              <input
                type="number"
                step="0.1"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-red-500"
                placeholder="8.5"
              />
            </div>
          </div>

          {/* Trạng thái */}
          <div>
            <label className="mb-2 block text-sm text-slate-400">Trạng thái</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-red-500"
            >
              <option value="now-showing">Đang chiếu</option>
              <option value="coming-soon">Sắp chiếu</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition"
            >
              {selectedMovie ? "Lưu thay đổi" : "Thêm phim"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Movies;