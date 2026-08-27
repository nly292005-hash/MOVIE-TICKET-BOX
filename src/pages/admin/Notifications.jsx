import { useState } from "react";

function Notifications() {
  const [notifications, setNotifications] =
    useState([
      {
        id: 1,
        title: "Khuyến mãi cuối tuần",
        content:
          "Giảm 20% giá vé vào thứ 7 và chủ nhật.",
        date: "10/08/2026",
        type: "promotion",
      },
      {
        id: 2,
        title: "Lịch bảo trì hệ thống",
        content:
          "Hệ thống sẽ bảo trì từ 02:00 đến 03:00.",
        date: "09/08/2026",
        type: "system",
      },
      {
        id: 3,
        title: "Phim mới cập nhật",
        content:
          "Đã cập nhật 5 bộ phim mới vào hệ thống.",
        date: "08/08/2026",
        type: "movie",
      },
    ]);

  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter(
        (item) => item.id !== id
      )
    );
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Thông báo
          </h1>

          <p className="mt-2 text-slate-500">
            Quản lý thông báo gửi tới người dùng.
          </p>
        </div>

        <button className="rounded-lg bg-red-600 px-5 py-3 font-semibold hover:bg-red-700">
          + Tạo thông báo
        </button>

      </div>

      <div className="space-y-4">

        {notifications.map((notification) => (

          <div
            key={notification.id}
            className="flex items-start gap-5 rounded-xl border border-slate-800 bg-slate-900 p-6"
          >

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-xl">
              {notification.type === "promotion"
                ? "🏷️"
                : notification.type === "movie"
                  ? "🎬"
                  : "🔔"}
            </div>

            <div className="flex-1">

              <div className="flex items-center justify-between">

                <h2 className="font-bold">
                  {notification.title}
                </h2>

                <span className="text-xs text-slate-600">
                  {notification.date}
                </span>

              </div>

              <p className="mt-2 text-sm text-slate-500">
                {notification.content}
              </p>

            </div>

            <button
              onClick={() =>
                deleteNotification(
                  notification.id
                )
              }
              className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-500"
            >
              Xóa
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Notifications;