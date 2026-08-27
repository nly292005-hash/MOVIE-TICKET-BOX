function Tickets() {
  const tickets = [
    {
      id: "TK00125",
      customer: "Nguyễn Văn An",
      movie: "Avengers: End Game",
      screen: "Cinema 01",
      seats: "A5, A6",
      amount: 200000,
      status: "paid",
    },
    {
      id: "TK00124",
      customer: "Trần Minh Anh",
      movie: "Spider-Man",
      screen: "Cinema 02",
      seats: "B5",
      amount: 100000,
      status: "paid",
    },
    {
      id: "TK00123",
      customer: "Lê Hoàng Nam",
      movie: "Interstellar",
      screen: "Cinema 03",
      seats: "C5, C6",
      amount: 200000,
      status: "pending",
    },
  ];

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Vé
        </h1>

        <p className="mt-2 text-slate-500">
          Quản lý vé được đặt tại rạp.
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

        <div className="grid gap-4 md:grid-cols-3">

          <input
            placeholder="Tìm mã vé..."
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-red-500"
          />

          <input
            type="date"
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />

          <select className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white">
            <option>Tất cả trạng thái</option>
            <option>Đã thanh toán</option>
            <option>Chờ thanh toán</option>
          </select>

        </div>

      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-950">

              <tr>

                <th className="px-5 py-4 text-left text-xs text-slate-500">
                  Mã vé
                </th>

                <th className="px-5 py-4 text-left text-xs text-slate-500">
                  Khách hàng
                </th>

                <th className="px-5 py-4 text-left text-xs text-slate-500">
                  Phim
                </th>

                <th className="px-5 py-4 text-left text-xs text-slate-500">
                  Phòng
                </th>

                <th className="px-5 py-4 text-left text-xs text-slate-500">
                  Ghế
                </th>

                <th className="px-5 py-4 text-left text-xs text-slate-500">
                  Tiền
                </th>

                <th className="px-5 py-4 text-left text-xs text-slate-500">
                  Trạng thái
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-800">

              {tickets.map((ticket) => (

                <tr key={ticket.id}>

                  <td className="px-5 py-4 font-semibold text-red-500">
                    #{ticket.id}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {ticket.customer}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-400">
                    {ticket.movie}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-400">
                    {ticket.screen}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {ticket.seats}
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {ticket.amount.toLocaleString(
                      "vi-VN"
                    )}
                    đ
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`rounded px-3 py-1 text-xs ${
                        ticket.status === "paid"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {ticket.status === "paid"
                        ? "Đã thanh toán"
                        : "Chờ thanh toán"}
                    </span>

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

export default Tickets;