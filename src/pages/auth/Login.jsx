import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth"; // 👈 Đã đổi từ AuthContext sang useAuth
import { MOCK_USERS } from "../../data/users";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Dùng chung cho cả form đăng nhập thật và các nút đăng nhập nhanh bằng tài khoản demo
  const performLogin = (loginEmail, loginPassword) => {
    setError("");

    const result = login(loginEmail, loginPassword);

    if (!result.success) {
      setError(result.error);
      return;
    }

    const loggedInEmail = result.user.email;

    // Chuyển hướng cho Admin
    if (loggedInEmail === "admin@gmail.com") {
      navigate("/admin");
      return;
    }

    // Chuyển hướng cho Manager
    if (loggedInEmail === "manager@gmail.com") {
      navigate("/manager");
      return;
    }

    // Chuyển hướng cho Khách hàng (Quay lại trang đang xem dở hoặc về Trang chủ)
    if (location.state?.redirectTo) {
      navigate(location.state.redirectTo, {
        state: location.state.booking ? { booking: location.state.booking } : undefined,
      });
      return;
    }

    navigate("/");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    performLogin(email, password);
  };

  const handleDemoLogin = (user) => {
    setEmail(user.email);
    setPassword(user.password);
    performLogin(user.email, user.password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-red-500">
            MovieBox
          </h1>

          <p className="mt-2 text-slate-500">
            Đăng nhập vào tài khoản của bạn
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl"
        >
          <div className="space-y-5">

            {/* LỖI ĐĂNG NHẬP */}
            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                {error}
              </p>
            )}

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="namanh@gmail.com"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-red-500"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <div className="mb-2 flex justify-between">
                <label className="text-sm font-medium text-slate-300">
                  Mật khẩu
                </label>

                <Link
                  to="#"
                  className="text-sm text-red-500 hover:text-red-400"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-red-500"
              />
            </div>

            {/* REMEMBER */}
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-700 bg-slate-950 accent-red-600"
              />
              Ghi nhớ đăng nhập
            </label>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Đăng nhập
            </button>

          </div>

          {/* REGISTER */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-semibold text-red-500 hover:text-red-400"
            >
              Đăng ký ngay
            </Link>
          </p>

        </form>

        {/* TÀI KHOẢN DEMO */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
            Đăng nhập nhanh bằng tài khoản demo
          </p>

          <div className="space-y-2">
            {MOCK_USERS.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleDemoLogin(user)}
                className="flex w-full items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-left transition hover:border-slate-600 hover:bg-slate-800"
              >
                <span>
                  <span className="block text-sm font-medium text-white">
                    {user.name}
                  </span>
                  <span className="block text-xs text-slate-500">
                    {user.email}
                  </span>
                </span>

                <span className="rounded-md bg-slate-800 px-2.5 py-1 text-[11px] font-bold tracking-wide text-slate-300">
                  {user.role}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;