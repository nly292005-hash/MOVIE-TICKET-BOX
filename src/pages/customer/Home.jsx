import { Link } from "react-router-dom";

import MovieCard from "../../components/MovieCard";
import { moviesData } from "../../data/movies";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="grid items-center gap-12 md:grid-cols-2">

            {/* Content */}
            <div>

              <span className="inline-block rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                🎬 Movie Ticket Booking
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
                Đặt vé xem phim
                <span className="block text-blue-500">
                  nhanh chóng
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                Khám phá những bộ phim mới nhất,
                lựa chọn suất chiếu và đặt ghế yêu thích
                của bạn ngay hôm nay.
              </p>

              <div className="mt-8 flex gap-4">

                <Link
                  to="/search"
                  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
                >
                  Khám phá phim
                </Link>

                <Link
                  to="/showtime"
                  className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
                >
                  Suất chiếu
                </Link>

              </div>

            </div>

            {/* Hero visual */}
            <div className="relative hidden md:block">

              <div className="absolute -inset-10 rounded-full bg-blue-600/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-3">

                {moviesData[0] && (
                  <img
                    src={moviesData[0].image}
                    alt={moviesData[0].movieName}
                    className="h-[500px] w-full rounded-2xl object-cover"
                  />
                )}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= MOVIES ================= */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="mb-8 flex items-end justify-between">

          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-blue-400">
              Movie Collection
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Phim đang chiếu
            </h2>
          </div>

          <Link
            to="/search"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Xem tất cả →
          </Link>

        </div>


        {/* Movie Grid */}

        {moviesData.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

            {moviesData.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}

          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-10 text-center">
            <p className="text-slate-400">
              Chưa có phim nào.
            </p>
          </div>
        )}

      </section>

    </div>
  );
}

export default Home;