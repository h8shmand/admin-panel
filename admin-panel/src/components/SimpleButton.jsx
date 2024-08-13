import { NavLink } from "react-router-dom";

export default function SimpleButton({ text, children, onClick }) {
  return (
    <button
      className="bg-mainBlue text-white p-2 w-auto h-[40px] rounded-lg flex flex-row items-center"
      onClick={onClick}
    >
      <div className="ml-1">{children}</div>
      <div>{text}</div>
    </button>
  );
}
