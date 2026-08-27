import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block overflow-hidden rounded-xl bg-slate-900 border border-slate-800 transition duration-300 hover:-translate-y-1 hover:border-blue-500"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">

        <img
          src={movie.image}
          alt={movie.movieName}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

        {/* Episode */}
        {movie.episode && (
          <span className="absolute right-3 top-3 rounded-md bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
            Tập {movie.episode}
          </span>
        )}

        {/* Detail button */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 transition group-hover:opacity-100">
          <span className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            Xem chi tiết
          </span>
        </div>

      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="truncate text-base font-semibold text-white">
          {movie.movieName}
        </h3>

        {movie.description && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-400">
            {movie.description}
          </p>
        )}
      </div>
    </Link>
  );
}

export default MovieCard;