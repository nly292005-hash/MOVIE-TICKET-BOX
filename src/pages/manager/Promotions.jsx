import { useState } from "react";

function Promotions() {
  const [promotions] = useState([
    {
      id: 1,
      name: "Happy Weekend",
      code: "WEEKEND20",
      discount: "20%",
      expire: "31/08/2026",
      status: "active",
    },
    {
      id: 2,
      name: "Student Discount",
      code: "STUDENT10",
      discount: "10%",
      expire: "30/09/2026",
      status: "active",
    },
    {
      id: 3,
      name: "Summer Sale",
      code: "SUMMER50",
      discount: "50%",
      expire: "01/08/2026",
      status: "expired",
    },
  ]);

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Khuyến mãi
          </h1>

          <p className="mt-2 text-slate-500">
            Quản lý chương trình khuyến mãi.
          </p>
        </div>

        <button className="rounded-lg bg-red-600 px-5 py-3 font-semibold">
          + Tạo khuyến mãi
        </button>

      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

        <table className="w-full">

          <thead className="bg-slate-950">

            <tr>
              <th className="px-5 py-4 text-left text-xs text-slate-500">
                Tên
              </th>

              <th className="px-5 py-4 text-left text-xs text-slate-500">
                Mã
              </th>

              <th className="px-5 py-4 text-left text-xs text-slate-500">
                Giảm
              </th>

              <th className="px-5 py-4 text-left text-xs text-slate-500">
                Hạn sử dụng
              </th>

              <th className="px-5 py-4 text-left text-xs text-slate-500">
                Trạng thái
              </th>
            </tr>

          </thead>

          <tbody className="divide-y divide-slate-800">

            {promotions.map((item) => (

              <tr key={item.id}>

                <td className="px-5 py-4 font-semibold">
                  {item.name}
                </td>

                <td className="px-5 py-4 text-red-500">
                  {item.code}
                </td>

                <td className="px-5 py-4">
                  {item.discount}
                </td>

                <td className="px-5 py-4 text-slate-400">
                  {item.expire}
                </td>

                <td className="px-5 py-4">

                  <span
                    className={`rounded px-3 py-1 text-xs ${
                      item.status === "active"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {item.status === "active"
                      ? "Đang hoạt động"
                      : "Hết hạn"}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Promotions;