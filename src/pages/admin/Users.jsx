import { useState } from "react";

function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn An",
      email: "nguyenvanan@gmail.com",
      phone: "0901234567",
      role: "Customer",
      status: "active",
    },
    {
      id: 2,
      name: "Trần Minh Anh",
      email: "minhanh@gmail.com",
      phone: "0912345678",
      role: "Customer",
      status: "active",
    },
    {
      id: 3,
      name: "Lê Hoàng Nam",
      email: "hoangnam@gmail.com",
      phone: "0987654321",
      role: "Manager",
      status: "active",
    },
    {
      id: 4,
      name: "Phạm Minh Đức",
      email: "minhduc@gmail.com",
      phone: "0978123456",
      role: "Customer",
      status: "blocked",
    },
  ]);

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "active"
                  ? "blocked"
                  : "active",
            }
          : user
      )
    );
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Quản lý người dùng
        </h1>

        <p className="mt-2 text-slate-500">
          Quản lý tài khoản người dùng trong hệ thống.
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

        <input
          placeholder="Tìm kiếm người dùng..."
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-red-500"
        />

      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="border-b border-slate-800 bg-slate-950">

              <tr>

                <th className="px-5 py-4 text-left text-xs text-slate-500">
                  Người dùng
                </th>

                <th className="px-5 py-4 text-left text-xs text-slate-500">
                  Email
                </th>

                <th className="px-5 py-4 text-left text-xs text-slate-500">
                  Số điện thoại
                </th>

                <th className="px-5 py-4 text-left text-xs text-slate-500">
                  Vai trò
                </th>

                <th className="px-5 py-4 text-left text-xs text-slate-500">
                  Trạng thái
                </th>

                <th className="px-5 py-4 text-left text-xs text-slate-500">
                  Thao tác
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-800">

              {users.map((user) => (

                <tr
                  key={user.id}
                  className="hover:bg-slate-800/50"
                >

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 font-bold">
                        {user.name.charAt(0)}
                      </div>

                      <span className="font-semibold">
                        {user.name}
                      </span>

                    </div>

                  </td>

                  <td className="px-5 py-4 text-sm text-slate-400">
                    {user.email}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-400">
                    {user.phone}
                  </td>

                  <td className="px-5 py-4">

                    <span className="rounded-md bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                      {user.role}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`rounded-md px-3 py-1 text-xs font-semibold ${
                        user.status === "active"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {user.status === "active"
                        ? "Hoạt động"
                        : "Đã khóa"}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <button
                      onClick={() =>
                        toggleStatus(user.id)
                      }
                      className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                        user.status === "active"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-green-500/10 text-green-500"
                      }`}
                    >
                      {user.status === "active"
                        ? "Khóa"
                        : "Mở khóa"}
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Users;