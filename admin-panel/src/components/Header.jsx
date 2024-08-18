import { useState } from "react";
import AnimatedMenuBtn from "./AnimatedMenuBtn";
import { MdLogout, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { IoIosArrowDown } from "react-icons/io";
export default function Header({ isMenuOpen, setIsManuOpen, userName }) {
  const [isUserOptionsVisible, setIsUserOptionsVisible] = useState(false);
  const navigate = useNavigate();
  const { logout, removeCookies } = useAuth();
  function handleCloseSession() {
    removeCookies();
    logout();
    navigate("/login");
  }

  return (
    <div className="header bg-mainBlue rounded-lg w-full h-[5%] min-h-[50px] box-border flex flex-row-reverse items-center justify-between">
      <button
        className="user-information mx-3 flex flex-row-reverse items-center space-x-2 min-w-[185px] relative"
        onClick={() => setIsUserOptionsVisible(!isUserOptionsVisible)}
      >
        <div
          className={`options-menu w-full bg-white rounded-lg shadow-light h-fit z-50 flex flex-col items-center top-[48px] ${
            isUserOptionsVisible ? "absolute" : "hidden"
          }`}
        >
          <div
            className="close-session flex flex-row items-center my-2"
            onClick={handleCloseSession}
          >
            <p className="ml-2">خروج از حساب</p>
            <MdLogout />
          </div>{" "}
          <div className="change-information flex flex-row items-center my-2">
            <p className="ml-2">ویرایش اطلاعات</p>
            <MdEdit />
          </div>
        </div>
        <img
          className="h-11 w-11 rounded-full"
          src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.webp"
          alt="profile"
        />
        <h3 className="text-gray-100 ">{userName}</h3>
        <IoIosArrowDown
          className={`text-white ml-2 ${
            isUserOptionsVisible
              ? "transition-transform duration-200 transform rotate-180"
              : "transition-transform duration-200 transform rotate-0"
          }`}
        />
      </button>
      <AnimatedMenuBtn isOpen={isMenuOpen} setIsOpen={setIsManuOpen} />
    </div>
  );
}
