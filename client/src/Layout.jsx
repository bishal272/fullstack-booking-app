import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
  return (
    <div className="font-poppins py-4 px-4 flex flex-col min-h-screen min-w-[775px]">
      <Header />
      <Outlet />
    </div>
  );
}
