import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdArticle, MdCategory } from "react-icons/md";
import { AiFillProduct, AiFillDashboard } from "react-icons/ai";
export default function SideBar({ isMenuOpen, setIsMenuOpen }) {
  return (
    <div
      className={`side-bar w-[15%] h-[99%] bg-gray-100 rounded-lg duration-500 shadow-light max-[800px]:absolute max-[800px]:w-[260px] max-[800px]:h-[99%] max-[800px]:right-[-266px] ${
        isMenuOpen ? "open" : ""
      }`}
    >
      <div className="side-bar-list w-full text-center mx-auto flex flex-col [&>*]:my-4 text-mainBlue">
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
        <Btn toUrl="/" text="کاربران" setIsMenuOpen={setIsMenuOpen}>
          <FaUser />
        </Btn>
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
