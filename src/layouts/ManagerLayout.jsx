import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function ManagerLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Sidebar role="manager" />

      <div className="ml-64 min-h-screen">

        {/* TOP BAR */}
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-8 backdrop-blur">

          <div>

            <p className="text-sm text-slate-500">
              Theater Management
            </p>

            <h1 className="font-semibold">
              MovieBox
            </h1>

          </div>

          <div className="flex items-center gap-4">

            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white">
              🔔
            </button>

            <div className="text-right">

              <p className="text-sm font-semibold">
                Manager
              </p>

              <p className="text-xs text-slate-500">
                Theater Manager
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
              M
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

export default ManagerLayout;