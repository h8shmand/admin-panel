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
  "",
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
        <Table tableHeaders={tableHeaders}>
          <tbody>
            <tr className="border-b-2 border-gray-200">
              <td
                className={`w-[${Math.round(
                  100 / tableHeaders.length
                )}%] min-w-fit py-[5px] pl-[20px] whitespace-nowrap`}
              >
                خدمات و سرویس ها
              </td>
              <td
                className={`w-[${Math.round(
                  100 / tableHeaders.length
                )}%] overflow-x-hidden whitespace-nowrap  py-[5px] pl-[20px]`}
              >
                <div>
                  ما در ایران ساین با ارائه مجموعه ای از خدمات و سرویس ها
                </div>
              </td>
              <td
                className={`w-[${Math.round(
                  100 / tableHeaders.length
                )}%] min-w-fit py-[5px] pl-[20px] whitespace-nowrap`}
              >
                <img
                  className="h-11 w-11 rounded-lg"
                  src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.webp"
                  alt="fg"
                />
              </td>
              <td
                className={`w-[20px] min-w-fit py-[5px] pl-[20px] whitespace-nowrap`}
              >
                1403/02/24
              </td>
              <td
                className={`w-[${Math.round(
                  100 / tableHeaders.length
                )}%] min-w-fit py-[5px] pl-[20px] whitespace-nowrap`}
              >
                1403/05/07
              </td>
              <td
                className={`flex flex-row items-center justify-center w-[${Math.round(
                  100 / tableHeaders.length
                )}%] min-w-fit py-[5px] pl-[20px] whitespace-nowrap `}
              >
                <button>ویرایش</button>
                <button>حذف</button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
