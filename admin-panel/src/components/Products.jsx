import { FaPlus } from "react-icons/fa";
import SimpleButton from "./SimpleButton";
import Table from "./Table";
import { useEffect, useState } from "react";
import CreateProductForm from "./CreateProductForm";
import { useProducts } from "./context/ProductsProvider";
import NoItemsFound from "./NoItemsFound";
import UpdateProductForm from "./updating components/UpdateProductForm";
import SortButtons from "./SortButtons";
import Loader from "./Loader";

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
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [sort, setSort] = useState("date");
  const [ascDesc, setAscDesc] = useState("asc");
  const { products, deleteProduct, getProduct, selectedProduct, isLoading } =
    useProducts();
  const handleCreateForm = () => {
    setFormVisible(!formVisible);
  };
  function handleDelete(e, id) {
    e.preventDefault();
    deleteProduct(id);
  }
  function handleEdit(e, id) {
    e.preventDefault();
    getProduct(id);
  }
  useEffect(() => {
    if (selectedProduct) {
      setUpdateFormVisible(true);
    }
  }, [selectedProduct]);
  const dateOptions = {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return (
    <div className="w-full h-full">
      {isLoading && <Loader />}
      <CreateProductForm visible={formVisible} setVisible={setFormVisible} />
      <UpdateProductForm
        visible={updateFormVisible}
        setVisible={setUpdateFormVisible}
        productValues={selectedProduct}
      />
      <div className="products-container w-full h-full p-4 dark:bg-darkBody">
        <h2 className="font-bold text-mainBlue text-2xl block mb-4 dark:text-white">
          لیست محصولات
        </h2>
        <div className="flex flex-row justify-between items-center">
          <SimpleButton text="افزودن محصول جدید" onClick={handleCreateForm}>
            <FaPlus />
          </SimpleButton>
          <SortButtons
            sortby={sort}
            setSortBy={setSort}
            ascDesc={ascDesc}
            setAscDesc={setAscDesc}
          />
        </div>
        {products.length === 0 ? (
          <NoItemsFound />
        ) : (
          <Table key={2} tableHeaders={tableHeaders}>
            {products
              .sort((a, b) => {
                if (ascDesc === "asc") {
                  if (sort === "name") return a.title.localeCompare(b.title);
                  else if (sort === "date")
                    return new Date(b.createdAt) - new Date(a.createdAt);
                } else if (ascDesc === "desc") {
                  if (sort === "name") return b.title.localeCompare(a.title);
                  else if (sort === "date")
                    return new Date(a.createdAt) - new Date(b.createdAt);
                }
              })
              .map((item) => (
                <tr
                  key={item.id}
                  className="border-b-2 border-gray-200 dark:border-gray-500 h-12 [&>*]: dark:text-white"
                >
                  <td>{item.title}</td>
                  <td>{item.category?.name}</td>
                  <td>{item.user?.fullName}</td>
                  <td>{item.content}</td>
                  <td>
                    <img
                      className="w-12 h-12"
                      src={item.url}
                      alt={item.title}
                    />
                  </td>
                  <td>
                    {new Date(item.createdAt).toLocaleString(
                      "fa-IR",
                      dateOptions
                    )}
                  </td>
                  <td>
                    {new Date(item.updatedAt).toLocaleString(
                      "fa-IR",
                      dateOptions
                    )}
                  </td>
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
