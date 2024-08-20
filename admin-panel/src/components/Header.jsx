import { useEffect, useState } from "react";
import AnimatedMenuBtn from "./AnimatedMenuBtn";
import { MdLogout, MdEdit } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { IoIosArrowDown } from "react-icons/io";
import UpdateUserForm from "./updating components/UpdateUserForm";
import { useUsers } from "./context/UsersProvider";
export default function Header({
  isMenuOpen,
  setIsManuOpen,
  isOptionMenuOpen,
  setIsOptionManuOpen,
}) {
  const [formVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();
  const { user, logout, removeCookies } = useAuth();
  const { getUser, selectedUser } = useUsers();
  useEffect(() => {
    if (user) {
    }
  }, [user]);

  function handleCloseSession() {
    removeCookies();
    logout();
    navigate("/login");
    window.location.reload();
  }
  function handleEdit(e) {
    e.preventDefault();
    getUser(user.userId);
  }
  useEffect(() => {
    if (selectedUser) {
      navigate("updateProfile");
    }
  }, [selectedUser]);
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
    <div className="header shadow-light bg-mainBlue rounded-lg w-full h-[5%] min-h-[50px] box-border flex flex-row-reverse items-center justify-between">
      <button
        className="user-information mx-3 flex flex-row-reverse items-center space-x-2 min-w-[185px] relative"
        onClick={() => setIsOptionManuOpen(!isOptionMenuOpen)}
      >
        <div
          className={`options-menu w-full bg-white rounded-lg shadow-light h-fit z-50 flex flex-col items-center top-[48px] ${
            isOptionMenuOpen ? "absolute" : "hidden"
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
            <div
              className="ml-2"
              to={"updateProfile"}
              onClick={(e) => handleEdit(e)}
            >
              ویرایش اطلاعات
            </div>
            <MdEdit />
          </div>
        </div>
        <img
          className="h-11 w-11 rounded-full"
          src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.webp"
          alt="profile"
        />
        <h3 className="text-gray-100 ">{user?.fullName}</h3>
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
