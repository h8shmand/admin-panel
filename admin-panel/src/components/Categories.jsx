import { FaPlus } from "react-icons/fa";
import SimpleButton from "./SimpleButton";
import Table from "./Table";
import { useState } from "react";
import CreateCategoryForm from "./CreateCategoryForm";

const tableHeaders = [
  "نام",
  "توضیحات",
  "تصویر",
  "تاریخ ایجاد",
  "تاریخ بروزرسانی",
];

export default function Categories() {
  const [formVisible, setFormVisible] = useState(false);
  const handleCreateForm = () => {
    setFormVisible(!formVisible);
  };
  return (
    <div className="w-full h-full">
      <CreateCategoryForm visible={formVisible} setVisible={setFormVisible} />
      <div className="categories-container w-full h-full p-4">
        <h2 className="font-bold text-mainBlue text-2xl block mb-4">
          لیست دسته بندی ها
        </h2>
        <SimpleButton text="افزودن دسته بندی" onClick={handleCreateForm}>
          <FaPlus />
        </SimpleButton>
        <Table tableHeaders={tableHeaders}></Table>
      </div>
    </div>
  );
}
