function Seat({
  seat,
  selected = false,
  booked = false,
  onClick,
}) {
  return (
    <button
      type="button"
      disabled={booked}
      onClick={() => onClick(seat)}
      className={`flex h-10 w-10 items-center justify-center rounded-md text-xs font-semibold transition ${
        booked
          ? "cursor-not-allowed bg-slate-700 text-slate-500"
          : selected
            ? "bg-red-600 text-white"
            : "bg-slate-800 text-slate-300 hover:bg-red-500 hover:text-white"
      }`}
    >
      {seat.number}
    </button>
  );
}

export default Seat;