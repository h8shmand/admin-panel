import { FaPlus } from "react-icons/fa";
import SimpleButton from "./SimpleButton";
import Table from "./Table";
import { useEffect, useState } from "react";
import CreateCategoryForm from "./CreateCategoryForm";
import { useCategories } from "./context/CategoriesProvider";
import NoItemsFound from "./NoItemsFound";
import UpdateCategoryForm from "./updating components/UpdateCategoryForm";

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
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const { categories, deleteCategory, getCategory, selectedCategory } =
    useCategories();

  const handleCreateForm = () => {
    setFormVisible(!formVisible);
  };
  function handleDelete(e, id) {
    e.preventDefault();
    deleteCategory(id);
  }
  function handleEdit(e, id) {
    e.preventDefault();
    getCategory(id);
  }
  useEffect(() => {
    if (selectedCategory) {
      setUpdateFormVisible(true);
    }
  }, [selectedCategory]);
  return (
    <div className="w-full h-full">
      <CreateCategoryForm visible={formVisible} setVisible={setFormVisible} />
      <UpdateCategoryForm
        visible={updateFormVisible}
        setVisible={setUpdateFormVisible}
        categoryValues={selectedCategory}
      />
      <div className="categories-container w-full h-full p-4">
        <h2 className="font-bold text-mainBlue text-2xl block mb-4">
          لیست دسته بندی ها
        </h2>
        <SimpleButton text="افزودن دسته بندی" onClick={handleCreateForm}>
          <FaPlus />
        </SimpleButton>
        {categories.length === 0 ? (
          <NoItemsFound />
        ) : (
          <Table key={1} tableHeaders={tableHeaders}>
            {categories.map((item) => (
              <tr key={item.id} className="border-b-2 border-gray-200">
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <img className="w-12 h-12" src={item.url} alt={item.name} />
                </td>
                <td>{new Date(item.createdAt).toLocaleString("fa-IR")}</td>
                <td>{new Date(item.updatedAt).toLocaleString("fa-IR")}</td>
                <td>
                  <div className="flex flex-row items-center">
                    <button
                      className="edit-btn bg-green-500 text-white h-7 rounded-lg w-14 ml-2"
                      onClick={(e) => handleEdit(e, item.id)}
                    >
                      ویرایش
                    </button>
                    <button
                      className="delete-btn bg-red-500 text-white h-7 rounded-lg w-14"
                      onClick={(e) => handleDelete(e, item.id)}
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </div>
    </div>
  );
}
