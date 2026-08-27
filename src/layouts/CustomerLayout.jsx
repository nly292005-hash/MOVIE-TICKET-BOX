import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function CustomerLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <Outlet />
    </div>
  );
}

export default CustomerLayout;