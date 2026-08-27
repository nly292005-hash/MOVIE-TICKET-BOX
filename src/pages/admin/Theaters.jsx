import { useState } from "react";
import Modal from "../../components/Modal";

function Theaters() {
  const [theaters, setTheaters] = useState([
    {
      id: 1,
      name: "CGV Vincom",
      address: "191 Bà Triệu, Hai Bà Trưng, Hà Nội",
      rooms: 8,
      seats: 920,
      status: "active",
    },
    {
      id: 2,
      name: "Lotte Cinema",
      address: "54 Liễu Giai, Ba Đình, Hà Nội",
      rooms: 6,
      seats: 680,
      status: "active",
    },
    {
      id: 3,
      name: "Galaxy Cinema",
      address: "116 Nguyễn Du, Hai Bà Trưng, Hà Nội",
      rooms: 5,
      seats: 540,
      status: "active",
    },
  ]);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedTheater, setSelectedTheater] =
    useState(null);

  const handleDelete = (id) => {
    if (!window.confirm("Xóa rạp này?")) return;

    setTheaters(
      theaters.filter(
        (theater) => theater.id !== id
      )
    );
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Quản lý rạp
          </h1>

          <p className="mt-2 text-slate-500">
            Quản lý hệ thống rạp chiếu phim.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedTheater(null);
            setIsModalOpen(true);
          }}
          className="rounded-lg bg-red-600 px-5 py-3 font-semibold hover:bg-red-700"
        >
          + Thêm rạp
        </button>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {theaters.map((theater) => (

          <div
            key={theater.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-6"
          >

            <div className="flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-2xl">
                🏢
              </div>

              <span className="rounded-md bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-500">
                Hoạt động
              </span>

            </div>

            <h2 className="mt-5 text-xl font-bold">
              {theater.name}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {theater.address}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">

              <div className="rounded-lg bg-slate-800 p-4">
                <p className="text-xs text-slate-500">
                  Phòng chiếu
                </p>

                <p className="mt-1 text-xl font-bold">
                  {theater.rooms}
                </p>
              </div>

              <div className="rounded-lg bg-slate-800 p-4">
                <p className="text-xs text-slate-500">
                  Số ghế
                </p>

                <p className="mt-1 text-xl font-bold">
                  {theater.seats}
                </p>
              </div>

            </div>

            <div className="mt-5 flex gap-2">

              <button
                onClick={() => {
                  setSelectedTheater(theater);
                  setIsModalOpen(true);
                }}
                className="flex-1 rounded-lg border border-slate-700 py-2.5 text-sm font-semibold hover:border-blue-500"
              >
                Chỉnh sửa
              </button>

              <button
                onClick={() =>
                  handleDelete(theater.id)
                }
                className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-500/20"
              >
                Xóa
              </button>

            </div>

          </div>

        ))}

      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        title={
          selectedTheater
            ? "Chỉnh sửa rạp"
            : "Thêm rạp"
        }
      >

        <div className="space-y-5">

          <input
            defaultValue={
              selectedTheater?.name || ""
            }
            placeholder="Tên rạp"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-red-500"
          />

          <input
            defaultValue={
              selectedTheater?.address || ""
            }
            placeholder="Địa chỉ"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-red-500"
          />

          <div className="flex justify-end gap-3">

            <button
              onClick={() =>
                setIsModalOpen(false)
              }
              className="rounded-lg border border-slate-700 px-5 py-2.5"
            >
              Hủy
            </button>

            <button
              onClick={() =>
                setIsModalOpen(false)
              }
              className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold"
            >
              Lưu
            </button>

          </div>

        </div>

      </Modal>

    </div>
  );
}

export default Theaters;