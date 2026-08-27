function Revenue() {
  const revenueData = [
    {
      date: "04/08",
      revenue: 12500000,
    },
    {
      date: "05/08",
      revenue: 15800000,
    },
    {
      date: "06/08",
      revenue: 14200000,
    },
    {
      date: "07/08",
      revenue: 18900000,
    },
    {
      date: "08/08",
      revenue: 21500000,
    },
    {
      date: "09/08",
      revenue: 19800000,
    },
    {
      date: "10/08",
      revenue: 23400000,
    },
  ];

  const total = revenueData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const maxRevenue = Math.max(
    ...revenueData.map(
      (item) => item.revenue
    )
  );

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Doanh thu
        </h1>

        <p className="mt-2 text-slate-500">
          Theo dõi doanh thu của hệ thống.
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-5 md:grid-cols-3">

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

          <p className="text-sm text-slate-500">
            Tổng doanh thu
          </p>

          <p className="mt-2 text-3xl font-bold">
            {total.toLocaleString("vi-VN")}đ
          </p>

        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

          <p className="text-sm text-slate-500">
            Trung bình / ngày
          </p>

          <p className="mt-2 text-3xl font-bold">
            {Math.round(
              total / revenueData.length
            ).toLocaleString("vi-VN")}
            đ
          </p>

        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

          <p className="text-sm text-slate-500">
            Ngày cao nhất
          </p>

          <p className="mt-2 text-3xl font-bold text-green-500">
            23.4M
          </p>

        </div>

      </div>

      {/* CHART */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="text-lg font-bold">
          Doanh thu 7 ngày
        </h2>

        <div className="mt-8 flex h-80 items-end gap-4">

          {revenueData.map((item) => {

            const height =
              (item.revenue / maxRevenue) *
              100;

            return (
              <div
                key={item.date}
                className="flex flex-1 flex-col items-center justify-end"
              >

                <span className="mb-2 text-xs text-slate-500">
                  {(item.revenue / 1000000).toFixed(
                    1
                  )}
                  M
                </span>

                <div
                  style={{
                    height: `${height}%`,
                  }}
                  className="w-full max-w-16 rounded-t-lg bg-red-600 transition hover:bg-red-500"
                />

                <span className="mt-3 text-xs text-slate-600">
                  {item.date}
                </span>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default Revenue;