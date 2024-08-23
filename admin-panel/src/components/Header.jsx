import { useEffect, useState } from "react";
import AnimatedMenuBtn from "./AnimatedMenuBtn";
import { MdLogout, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { IoIosArrowDown } from "react-icons/io";
import { useUsers } from "./context/UsersProvider";
export default function Header({
  isMenuOpen,
  setIsManuOpen,
  isOptionMenuOpen,
  setIsOptionManuOpen,
}) {
  const navigate = useNavigate();
  const { removeCookies } = useAuth();
  const { fullName, userId, url, isAdmin } = JSON.parse(
    Cookies.get("userInfo")
  );
  const { getProfile, selectedProfile } = useUsers();

  function handleCloseSession() {
    removeCookies();
    navigate("/login");
    window.location.reload();
  }
  function handleEdit(e) {
    e.preventDefault();
    getProfile(userId);
  }
  useEffect(() => {
    if (selectedProfile) {
      navigate("updateProfile");
    }
  }, [selectedProfile]);
  // if (formVisible)
  //   return (
  //     <UpdateUserForm
  //       visible={formVisible}
  //       setVisible={setFormVisible}
  //       values={selectedUser}
  //       disableEmail={true}
  //     />
  //   );
  return (
    <div className="header shadow-light bg-mainBlue dark:bg-darkHead rounded-lg w-full h-[5%] min-h-[50px] box-border flex flex-row-reverse items-center justify-between">
      <button
        className="user-information mx-3 flex flex-row-reverse items-center space-x-2 min-w-[185px] relative"
        onClick={() => setIsOptionManuOpen(!isOptionMenuOpen)}
      >
        <div
          className={`options-menu w-full bg-white dark:bg-darkHead dark:border-2 dark:border-white rounded-lg shadow-light h-fit z-50 flex flex-col items-center top-[48px] ${
            isOptionMenuOpen ? "absolute" : "hidden"
          }`}
        >
          <div
            className="close-session flex flex-row items-center my-2"
            onClick={handleCloseSession}
          >
            <p className="ml-2 dark:text-white">خروج از حساب</p>
            <MdLogout className="dark:text-white" />
          </div>
          <div className="change-information flex flex-row items-center my-2">
            <div
              className="ml-2 dark:text-white"
              onClick={(e) => handleEdit(e)}
            >
              ویرایش اطلاعات
            </div>
            <MdEdit className="dark:text-white" />
          </div>
        </div>
        <img
          className="h-11 w-11 rounded-full border-2 border-white"
          src={url || "/images/defaultProfile.jpg"}
          alt="profile"
        />
        <div>
          <h3 className="text-gray-100 ">{fullName}</h3>
          <p className="text-gray-300 text-xs text-right pr-2">
            {isAdmin ? "مدیر" : "نویسنده"}
          </p>
        </div>
        <IoIosArrowDown
          className={`text-white ml-2 ${
            isOptionMenuOpen
              ? "transition-transform duration-200 transform rotate-180"
              : "transition-transform duration-200 transform rotate-0"
          }`}
        />
      </button>
      <AnimatedMenuBtn isOpen={isMenuOpen} setIsOpen={setIsManuOpen} />
    </div>
  );
}
