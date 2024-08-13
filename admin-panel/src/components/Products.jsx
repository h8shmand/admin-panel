import { FaPlus } from "react-icons/fa";
import SimpleButton from "./SimpleButton";
import Table from "./Table";
import { useState } from "react";
import CreateProductForm from "./CreateProductForm";

const tableHeaders = [
  "عنوان محصول",
  "دسته بندی",
  "نویسنده",
  "توضیحات",
  "تصویر",
  "تاریخ ایجاد",
  "تاریخ بروزرسانی",
];

export default function Products() {
  const [formVisible, setFormVisible] = useState(false);
  const handleCreateForm = () => {
    setFormVisible(!formVisible);
  };
  return (
    <div className="w-full h-full">
      <CreateProductForm visible={formVisible} setVisible={setFormVisible} />
      <div className="products-container w-full h-full p-4">
        <h2 className="font-bold text-mainBlue text-2xl block mb-4">
          لیست محصولات
        </h2>
        <SimpleButton text="افزودن محصول جدید" onClick={handleCreateForm}>
          <FaPlus />
        </SimpleButton>
        <Table tableHeaders={tableHeaders}></Table>
      </div>
    </div>
  );
}
