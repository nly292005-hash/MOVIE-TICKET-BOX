import { MOCK_USERS } from "../data/users";

const CURRENT_USER_KEY = "current_user";

// 1. Lấy thông tin user hiện tại
export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

// 2. Kiểm tra đã đăng nhập chưa
export const isLoggedIn = () => {
  return !!getCurrentUser();
};

// 3. Hàm Đăng nhập từ Form (Login.jsx cần hàm này)
export const loginUser = (email, password) => {
  // Tìm user matching email trong MOCK_USERS
  const foundUser = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (foundUser) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
    return { success: true, user: foundUser };
  }

  // Mặc định nếu nhập email bất kỳ thì lấy account đầu tiên (để tiện demo)
  const defaultUser = MOCK_USERS[0];
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(defaultUser));
  return { success: true, user: defaultUser };
};

// 4. Hàm đăng nhập nhanh theo object user (dùng cho UserHeader)
export const loginAsUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  window.location.reload();
};

// 5. Đăng xuất
export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  window.location.reload();
};