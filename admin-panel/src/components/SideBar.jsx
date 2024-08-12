import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdArticle, MdCategory } from "react-icons/md";
import { AiFillProduct, AiFillDashboard } from "react-icons/ai";
export default function SideBar() {
  return (
    <div className="side-bar w-1/4 h-[99%] bg-gray-100 rounded-lg shadow-light ">
      <div className="side-bar-list w-full text-center mx-auto flex flex-col [&>*]:my-4 text-mainBlue">
        <Btn toUrl="/dashboard" text="داشبورد">
          <AiFillDashboard />
        </Btn>
        <Btn toUrl="categories" text="دسته بندی ها">
          <MdCategory />
        </Btn>
        <Btn toUrl="/" text="محصولات">
          <AiFillProduct />{" "}
        </Btn>
        <Btn toUrl="/" text="مقالات">
          <MdArticle />
        </Btn>
        <Btn toUrl="/" text="کاربران">
          <FaUser />
        </Btn>
      </div>
    </div>
  );
}

function Btn({ text, toUrl, children }) {
  return (
    <NavLink
      to={toUrl}
      className={"flex flex-row-reverse items-center justify-center"}
    >
      {text}&nbsp;{children}
    </NavLink>
  );
}
