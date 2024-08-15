import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function CreateUserForm({ visible, setVisible }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [role, setRole] = useState("");
  const handleCloseForm = (e) => {
    // e.preventDefault();
    if (e.target === e.currentTarget) {
      setVisible(false);
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setReEnterPassword("");
    }
  };
  return (
    <div
      onClick={handleCloseForm}
      className={`back-drop bg-black/20 w-full h-full backdrop-blur z-10 absolute flex items-center justify-center ${
        visible ? "" : "hidden"
      }`}
    >
      <div className="w-[85%] h-[92%] bg-white rounded-lg relative z-20 shadow-light overflow-y-auto">
        <button
          onClick={handleCloseForm}
          className="absolute right-2 top-2 w-fit h-fit"
        >
          <FaTimes className="text-mainBlue pointer-events-none" />
        </button>
        <h2 className="text-xl text-mainBlue block w-full pr-6 mt-10">
          افزودن کاربر
        </h2>

        <form
          action="submit"
          className="flex flex-col w-full items-center mt-6"
        >
          <label htmlFor="userNameInput" className="block w-[70%] text-right">
            نام و نام خانوادگی
          </label>
          <input
            name="userNameInput"
            type="text"
            className="border-2 border-mainBlue rounded w-[70%] h-10 text-sm px-2 mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="emailInput" className="block w-[70%] text-right">
            ایمیل
          </label>
          <input
            name="emailInput"
            id="emailInput"
            type="text"
            className="border-2 border-mainBlue rounded w-[70%] h-10 text-sm px-2 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="passwordInput" className="block w-[70%] text-right">
            گذرواژه
          </label>
          <input
            name="passwordInput"
            type="password"
            className="border-2 border-mainBlue rounded w-[70%] h-10 text-sm px-2 mb-4 resize-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="reEnterPasswordInput"
            className="block w-[70%] text-right"
          >
            تکرار گذرواژه
          </label>
          <input
            name="reEnterPasswordInput"
            type="password"
            className="border-2 border-mainBlue rounded w-[70%] h-10 text-sm px-2 mb-4 resize-none"
            value={reEnterPassword}
            onChange={(e) => {
              setReEnterPassword(e.target.value);
            }}
          />
          <label htmlFor="roleInput" className="block w-[70%] text-right">
            نقش
          </label>
          <input
            name="roleInput"
            type="text"
            className="border-2 border-mainBlue rounded w-[70%] h-10 text-sm px-2 mb-4 resize-none"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <button className="w-fit py-1 px-6 bg-mainBlue rounded flex items-center text-white my-8">
            ایجاد
          </button>
        </form>
      </div>
    </div>
  );
}
