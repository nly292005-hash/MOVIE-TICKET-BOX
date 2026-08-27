import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth"; // 👈 Đã đổi từ AuthContext sang useAuth

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const result = register(name, email, password);

    if (!result.success) {
      setError(result.error);
      return;
    }

    if (location.state?.redirectTo) {
      navigate(location.state.redirectTo, {
        state: location.state.booking,
      });
      return;
    }

    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-red-500">
            MovieBox
          </h1>

          <p className="mt-2 text-slate-500">
            Tạo tài khoản mới để tiếp tục
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleRegister}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl"
        >
          <div className="space-y-5">

            {/* LỖI ĐĂNG KÝ */}
            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                {error}
              </p>
            )}

            {/* TÊN HIỂN THỊ */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Tên hiển thị
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-red-500"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
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
                onChange={(e) =>
                  setPassword(e.target.value)
                }
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
              Đăng ký
            </button>

          </div>

          {/* LOGIN */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="font-semibold text-red-500 hover:text-red-400"
            >
              Đăng nhập ngay
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Register;