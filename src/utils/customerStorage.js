// ==========================================
// 1. QUẢN LÝ PHIM YÊU THÍCH (FAVORITES)
// ==========================================

// Lắng nghe thay đổi danh sách yêu thích
export const onFavoritesChanged = (callback) => {
  const handleUpdate = () => callback();

  window.addEventListener("storage", handleUpdate);
  window.addEventListener("favorites_updated", handleUpdate);

  return () => {
    window.removeEventListener("storage", handleUpdate);
    window.removeEventListener("favorites_updated", handleUpdate);
  };
};

// Lấy danh sách ID phim yêu thích theo userId
export const getFavoriteMovieIds = (userId = "guest") => {
  const key = `favorite_movies_${userId}`;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
};

// Thêm / Xóa phim khỏi danh sách yêu thích theo userId
export const toggleFavoriteMovie = (movieId, userId = "guest") => {
  const key = `favorite_movies_${userId}`;
  const favorites = getFavoriteMovieIds(userId);
  const strId = String(movieId);

  let updated;
  if (favorites.includes(strId)) {
    updated = favorites.filter((id) => id !== strId);
  } else {
    updated = [...favorites, strId];
  }

  localStorage.setItem(key, JSON.stringify(updated));
  window.dispatchEvent(new Event("favorites_updated"));
  return updated;
};

// ==========================================
// 2. QUẢN LÝ ĐẶT GHẾ (BOOKING SEATS)
// ==========================================

// Tạo key duy nhất cho từng suất chiếu
const getShowtimeKey = (showtime) => {
  if (!showtime) return "booked_seats_default";
  const { movieId, cinemaId, date, time } = showtime;
  return `booked_seats_${movieId}_${cinemaId}_${date}_${time}`;
};

// Lấy danh sách các ghế đã được đặt cho suất chiếu
export const getBookedSeats = (showtime) => {
  try {
    const key = getShowtimeKey(showtime);
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Lỗi khi đọc danh sách ghế đã đặt:", err);
    return [];
  }
};

// Đặt ghế cho suất chiếu
export const bookSeats = (showtime, seatsToBook = []) => {
  try {
    const key = getShowtimeKey(showtime);
    const currentlyBooked = getBookedSeats(showtime);

    // Kiểm tra trùng lặp ghế (xung đột dữ liệu)
    const conflicts = seatsToBook.filter((seat) => currentlyBooked.includes(seat));

    if (conflicts.length > 0) {
      return {
        success: false,
        bookedSeats: currentlyBooked,
        conflicts,
      };
    }

    const updatedBookedSeats = [...currentlyBooked, ...seatsToBook];
    localStorage.setItem(key, JSON.stringify(updatedBookedSeats));

    // Phát sự kiện thông báo dữ liệu ghế đã cập nhật
    window.dispatchEvent(new Event("booked_seats_updated"));

    return {
      success: true,
      bookedSeats: updatedBookedSeats,
      conflicts: [],
    };
  } catch (err) {
    console.error("Lỗi khi lưu đặt ghế:", err);
    return {
      success: false,
      bookedSeats: [],
      conflicts: seatsToBook,
    };
  }
};

// Lắng nghe thay đổi ghế realtime
export const onBookedSeatsChanged = (showtime, callback) => {
  const handleUpdate = () => callback();

  window.addEventListener("storage", handleUpdate);
  window.addEventListener("booked_seats_updated", handleUpdate);

  return () => {
    window.removeEventListener("storage", handleUpdate);
    window.removeEventListener("booked_seats_updated", handleUpdate);
  };
};