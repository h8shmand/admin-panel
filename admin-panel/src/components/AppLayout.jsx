import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function AppLayout() {
  return (
    <div className="app-layout h-[95%] w-full flex flex-row-reverse items-center">
      <div className="item-app-layout bg-white w-3/4 mr-2 shadow-light rounded-lg h-[99%]">
        <Outlet />
      </div>
      <SideBar />
    </div>
  );
}
