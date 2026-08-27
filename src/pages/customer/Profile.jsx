import { useState } from "react";

function Profile() {
  const [form, setForm] = useState({
    name: "Nguyễn Văn An",
    email: "nguyenvanan@gmail.com",
    phone: "0901234567",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Hồ sơ cá nhân
        </h1>

        <p className="mt-2 text-slate-500">
          Quản lý thông tin tài khoản.
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

        <div className="flex items-center gap-5 border-b border-slate-800 pb-6">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-3xl font-bold">
            A
          </div>

          <div>
            <h2 className="text-xl font-bold">
              {form.name}
            </h2>

            <p className="text-sm text-slate-500">
              Thành viên MovieBox
            </p>
          </div>

        </div>

        <div className="mt-6 space-y-5">

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Họ và tên
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Email
            </label>

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Số điện thoại
            </label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-red-500"
            />
          </div>

          <button className="rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700">
            Lưu thay đổi
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;