import { FaPlus } from "react-icons/fa";
import SimpleButton from "./SimpleButton";
import Table from "./Table";

const tableHeaders = [
  "عنوان مقاله",
  "نویسنده",
  "تعداد بازدید",
  "تصویر",
  "توضیحات",
  "تاریخ ایجاد",
  "تاریخ بروزرسانی",
  "",
];

export default function Articles() {
  return (
    <div className="w-full h-full">
      <div className="categories-container w-full h-full p-4">
        <h2 className="font-bold text-mainBlue text-2xl block mb-4">
          لیست مقالات
        </h2>
        <SimpleButton text="افزودن مقاله جدید">
          <FaPlus />
        </SimpleButton>
        <Table tableHeaders={tableHeaders}></Table>
      </div>
    </div>
  );
}
