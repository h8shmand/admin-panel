import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import { useState } from "react";
import { useAuth } from "./context/AuthProvider";
import { useProducts } from "./context/ProductsProvider";

export default function AppLayout() {
  const [isMenuOpen, setIsManuOpen] = useState(false);
  const [isOptionMenuOpen, setIsOptionManuOpen] = useState(false);
  const { user } = useAuth();

  const handleCloseMenu = (e) => {
    if (isMenuOpen && !e.target.classList.contains("side-bar")) {
      setIsManuOpen(false);
    }
    if (isOptionMenuOpen && !e.target.classList.contains("options-menu")) {
      setIsOptionManuOpen(false);
    }
  };
  return (
    <div
      className="flex flex-col my-[0.5vh] h-[99vh] mx-auto w-[99vw]"
      onClick={handleCloseMenu}
    >
      <Header
        isMenuOpen={isMenuOpen}
        setIsManuOpen={setIsManuOpen}
        userName={user?.fullName}
        isOptionMenuOpen={isOptionMenuOpen}
        setIsOptionManuOpen={setIsOptionManuOpen}
      />
      <div className="app-layout h-[95%] w-full flex flex-row-reverse items-center relative">
        <div className="item-app-layout bg-white w-[85%] mr-2 shadow-light rounded-lg h-[99%] relative max-[800px]:w-full max-[800px]:mr-0">
          <Outlet />
        </div>
        <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsManuOpen} />
      </div>
    </div>
  );
}
