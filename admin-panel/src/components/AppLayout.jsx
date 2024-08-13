import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="flex flex-col my-[0.5vh] h-[99vh] mx-auto w-[99vw]">
      <Header />
      <div className="app-layout h-[95%] w-full flex flex-row-reverse items-center">
        <div className="item-app-layout bg-white w-[85%] mr-2 shadow-light rounded-lg h-[99%] relative">
          <Outlet />
        </div>
        <SideBar />
      </div>
    </div>
  );
}
