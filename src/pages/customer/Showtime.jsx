import { Link } from "react-router-dom";

function Showtime() {
  const movieId = "1";

  const showtimes = [
    {
      id: 1,
      theater: "CGV Vincom",
      address: "191 Bà Triệu",
      times: ["10:00", "13:30", "16:30", "19:00"],
    },
    {
      id: 2,
      theater: "Lotte Cinema",
      address: "54 Liễu Giai",
      times: ["11:00", "14:30", "18:00", "21:00"],
    },
    {
      id: 3,
      theater: "Galaxy Cinema",
      address: "116 Nguyễn Du",
      times: ["09:30", "12:30", "15:30", "20:00"],
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Chọn suất chiếu
        </h1>

        <p className="mt-2 text-slate-500">
          Chọn rạp và thời gian bạn muốn xem.
        </p>
      </div>

      {/* DATE */}
      <div className="flex gap-3 overflow-x-auto">

        {[
          "10/08",
          "11/08",
          "12/08",
          "13/08",
          "14/08",
        ].map((date, index) => (

          <button
            key={date}
            className={`min-w-24 rounded-xl border px-5 py-3 ${
              index === 0
                ? "border-red-600 bg-red-600"
                : "border-slate-800 bg-slate-900"
            }`}
          >
            <p className="text-xs text-slate-400">
              {index === 0
                ? "Hôm nay"
                : "Ngày"}
            </p>

            <p className="mt-1 font-semibold">
              {date}
            </p>

          </button>

        ))}

      </div>

      {/* THEATERS */}
      <div className="space-y-4">

        {showtimes.map((item) => (

          <div
            key={item.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-6"
          >

            <h2 className="text-xl font-bold">
              {item.theater}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {item.address}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">

              {item.times.map((time) => (

                <Link
                  key={time}
                  to={`/booking/${movieId}?time=${time}`}
                  className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold transition hover:border-red-500 hover:bg-red-600"
                >
                  {time}
                </Link>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Showtime;