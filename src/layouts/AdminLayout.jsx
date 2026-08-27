import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Sidebar role="admin" />

      <div className="ml-64 min-h-screen">

        {/* TOP BAR */}
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-8 backdrop-blur">

          <div>

            <p className="text-sm text-slate-500">
              Administration
            </p>

            <h1 className="font-semibold">
              MovieBox Management
            </h1>

          </div>

          <div className="flex items-center gap-3">

            <div className="text-right">

              <p className="text-sm font-semibold">
                Admin
              </p>

              <p className="text-xs text-slate-500">
                Administrator
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 font-bold">
              A
            </div>

          </div>

        </header>

        {/* PAGE */}
        <main className="p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;