import { createContext, useState } from "react";
import { MOCK_USERS } from "../data/users";

// 1. Thêm 'export' ở đây
export const AuthContext = createContext();

const CURRENT_USER_KEY = "current_user";
const REGISTERED_USERS_KEY = "registered_users";

const getRegisteredUsers = () => {
  try {
    const saved = localStorage.getItem(REGISTERED_USERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveRegisteredUsers = (users) => {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const findUserByEmail = (email) => {
    const normalized = (email || "").trim().toLowerCase();
    return (
      MOCK_USERS.find((u) => u.email.toLowerCase() === normalized) ||
      getRegisteredUsers().find((u) => u.email.toLowerCase() === normalized)
    );
  };

  const login = (email, password) => {
    const user = findUserByEmail(email);

    if (!user) {
      return { success: false, error: "Email không tồn tại. Vui lòng kiểm tra lại hoặc đăng ký tài khoản mới." };
    }

    if (user.password !== password) {
      return { success: false, error: "Sai mật khẩu. Vui lòng thử lại." };
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    setCurrentUser(user);
    return { success: true, user };
  };

  const register = (name, email, password) => {
    const trimmedEmail = (email || "").trim();

    const existingUser = findUserByEmail(trimmedEmail);
    if (existingUser) {
      return { success: false, error: "Email này đã được đăng ký. Vui lòng đăng nhập." };
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name: (name || "").trim() || trimmedEmail.split("@")[0] || "Người dùng mới",
      email: trimmedEmail,
      password: password || "",
      role: "MEMBER",
      favorites: [],
      bookings: [],
    };

    saveRegisteredUsers([...getRegisteredUsers(), newUser]);

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(null);
  };

  const switchUser = (user) => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, switchUser }}>
      {children}
    </AuthContext.Provider>
  );
}