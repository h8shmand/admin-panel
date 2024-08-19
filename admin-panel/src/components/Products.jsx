import { FaPlus } from "react-icons/fa";
import SimpleButton from "./SimpleButton";
import Table from "./Table";
import { useState } from "react";
import CreateProductForm from "./CreateProductForm";
import { useProducts } from "./context/ProductsProvider";

const tableHeaders = [
  "عنوان محصول",
  "دسته بندی",
  "نویسنده",
  "توضیحات",
  "تصویر",
  "تاریخ ایجاد",
  "تاریخ بروزرسانی",
  "",
];

export default function Products() {
  const [formVisible, setFormVisible] = useState(false);
  const { products, deleteProduct } = useProducts();
  const handleCreateForm = () => {
    setFormVisible(!formVisible);
  };
  function handleDelete(e, id) {
    e.preventDefault();
    deleteProduct(id);
  }
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

        <Table tableHeaders={tableHeaders}>
          {products.map((item) => (
            <tr key={item.id} className="border-b-2 border-gray-200">
              <td>{item.title}</td>
              <td>{item.category?.name}</td>
              <td>{item.user?.fullName}</td>
              <td>{item.content}</td>
              <td>
                <img className="w-12 h-12" src={item.url} alt={item.title} />
              </td>
              <td>{new Date(item.createdAt).toLocaleString("fa-IR")}</td>
              <td>{new Date(item.updatedAt).toLocaleString("fa-IR")}</td>
              <td>
                <div className="flex flex-row items-center">
                  <button className="edit-btn bg-green-500 text-white h-7 rounded-lg w-14 ml-2">
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
      </div>
    </div>
  );
}
