import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdArticle, MdCategory } from "react-icons/md";
import { AiFillProduct, AiFillDashboard } from "react-icons/ai";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { useEffect, useState } from "react";
export default function SideBar({ isMenuOpen, setIsMenuOpen }) {
  return (
    <div
      className={`side-bar w-[15%] h-[99%] bg-gray-100 dark:bg-darkHead rounded-lg duration-500 shadow-light max-[800px]:absolute max-[800px]:w-[260px] max-[800px]:h-[99%] max-[800px]:right-[-266px] min-[800px]:translate-x-0 z-50 relative ${
        isMenuOpen ? "open" : "closed"
      }`}
    >
      <div className="side-bar-list w-full text-center mx-auto flex flex-col [&>*]:my-4 text-mainBlue dark:text-white">
        <Btn toUrl="/dashboard" text="داشبورد" setIsMenuOpen={setIsMenuOpen}>
          <AiFillDashboard />
        </Btn>
        <Btn
          toUrl="categories"
          text="دسته بندی ها"
          setIsMenuOpen={setIsMenuOpen}
        >
          <MdCategory />
        </Btn>
        <Btn toUrl="products" text="محصولات" setIsMenuOpen={setIsMenuOpen}>
          <AiFillProduct />{" "}
        </Btn>
        <Btn toUrl="articles" text="مقالات" setIsMenuOpen={setIsMenuOpen}>
          <MdArticle />
        </Btn>
        <Btn toUrl="users" text="کاربران" setIsMenuOpen={setIsMenuOpen}>
          <FaUser />
        </Btn>
        <DarkModeBtn />
      </div>
    </div>
  );
}

function Btn({ text, toUrl, children, setIsMenuOpen }) {
  return (
    <NavLink
      to={toUrl}
      className={"flex flex-row-reverse items-center justify-center"}
      onClick={() => setIsMenuOpen(false)}
    >
      {text}&nbsp;{children}
    </NavLink>
  );
}

function DarkModeBtn() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkMode") === "true";
    console.log(darkModePreference);

    setIsDarkMode(darkModePreference);
    if (darkModePreference) {
      document.documentElement.classList.add("dark");
    }
  }, []);
  function handleDarkMode() {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      console.log("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      console.log("light");

      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }

  return (
    <div
      className="w-14 h-7 absolute bg-mainBlue dark:bg-white bottom-0 left-2 rounded-2xl shadow-light"
      onClick={handleDarkMode}
    >
      <div
        className={`bg-white dark:bg-darkBody absolute rounded-full h-7 w-7 flex justify-center items-center left-0 transition transform duration-500 ${
          isDarkMode ? "translate-x-7 rotate-180" : "translate-x-0 rotate-0"
        }`}
      >
        {isDarkMode ? (
          <MdLightMode className="text-2xl" />
        ) : (
          <MdDarkMode className="text-2xl" />
        )}
      </div>
    </div>
  );
}
