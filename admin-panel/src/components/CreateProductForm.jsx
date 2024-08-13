import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function CreateProductForm({ visible, setVisible }) {
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const handleCloseForm = (e) => {
    // e.preventDefault();
    if (e.target === e.currentTarget) {
      setVisible(false);
      setName("");
      setImage("");
      setDescription("");
    }
  };
  return (
    <div
      onClick={handleCloseForm}
      className={`back-drop bg-black/20 w-full h-full backdrop-blur z-10 absolute flex items-center justify-center ${
        visible ? "" : "hidden"
      }`}
    >
      <div className="w-[85%] h-fit bg-white rounded-lg relative z-20 shadow-light">
        <button
          onClick={handleCloseForm}
          className="absolute right-2 top-2 w-fit h-fit"
        >
          <FaTimes className="text-mainBlue pointer-events-none" />
        </button>
        <h2 className="text-xl text-mainBlue block w-full pr-6 mt-10">
          افزودن محصول
        </h2>
        <form
          action="submit"
          className="flex flex-col w-full items-center mt-6 "
        >
          <label
            htmlFor="productNameInput"
            className="block w-[70%] text-right"
          >
            نام محصول
          </label>
          <input
            name="productNameInput"
            type="text"
            className="border-2 border-mainBlue rounded w-[70%] h-10 text-sm px-2 mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label
            htmlFor="productCategoryNameInput"
            className="block w-[70%] text-right"
          >
            نام دسته بندی
          </label>
          <input
            name="productCategoryNameInput"
            type="text"
            className="border-2 border-mainBlue rounded w-[70%] h-10 text-sm px-2 mb-4"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <label htmlFor="productImgInput" className="block w-[70%] text-right">
            تصویر محصول
          </label>
          <input
            name="productImgInput"
            id="productImgInput"
            type="file"
            accept="image/*"
            className="border-2 border-mainBlue rounded w-[70%] h-10 text-sm px-2 mb-4"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <label
            htmlFor="productDescriptionTextArea"
            className="block w-[70%] text-right"
          >
            توضیحات محصول
          </label>
          <textarea
            name="productDescriptionTextArea"
            type="text"
            className="border-2 border-mainBlue rounded w-[70%] h-24 text-sm px-2 mb-4 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="w-fit py-1 px-6 bg-mainBlue rounded flex items-center text-white my-8">
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}
