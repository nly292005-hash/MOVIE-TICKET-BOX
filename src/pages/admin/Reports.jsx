function Reports() {
  const reports = [
    {
      title: "Báo cáo doanh thu",
      description:
        "Thống kê doanh thu theo ngày, tuần, tháng.",
      icon: "💰",
    },
    {
      title: "Báo cáo vé",
      description:
        "Thống kê số lượng vé bán ra.",
      icon: "🎟️",
    },
    {
      title: "Báo cáo phim",
      description:
        "Phân tích hiệu suất của từng bộ phim.",
      icon: "🎬",
    },
    {
      title: "Báo cáo rạp",
      description:
        "Thống kê hiệu suất từng rạp.",
      icon: "🏢",
    },
  ];

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Báo cáo
        </h1>

        <p className="mt-2 text-slate-500">
          Xem và phân tích dữ liệu hệ thống.
        </p>
      </div>

      {/* REPORT CARDS */}
      <div className="grid gap-5 md:grid-cols-2">

        {reports.map((report) => (

          <div
            key={report.title}
            className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-red-500/50"
          >

            <div className="flex items-start justify-between">

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/10 text-2xl">
                {report.icon}
              </div>

              <span className="text-slate-600 transition group-hover:text-red-500">
                →
              </span>

            </div>

            <h2 className="mt-6 text-xl font-bold">
              {report.title}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {report.description}
            </p>

            <button className="mt-5 text-sm font-semibold text-red-500">
              Xem báo cáo →
            </button>

          </div>

        ))}

      </div>

      {/* FILTER */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="text-lg font-bold">
          Bộ lọc báo cáo
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">

          <select className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white">
            <option>Doanh thu</option>
            <option>Vé bán</option>
            <option>Phim</option>
            <option>Rạp</option>
          </select>

          <input
            type="date"
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"
          />

          <input
            type="date"
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white"
          />

        </div>

        <button className="mt-5 rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700">
          Tạo báo cáo
        </button>

      </div>

    </div>
  );
}

export default Reports;