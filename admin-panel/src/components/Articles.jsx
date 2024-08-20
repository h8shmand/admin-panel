import { FaPlus } from "react-icons/fa";
import SimpleButton from "./SimpleButton";
import Table from "./Table";
import CreateArticleForm from "./CreateArticleForm";
import { useEffect, useState } from "react";
import { useArticles } from "./context/ArticlesProvider";
import NoItemsFound from "./NoItemsFound";
import UpdateArticleForm from "./updating components/UpdateArticlesForm";

const tableHeaders = [
  "عنوان مقاله",
  "نویسنده",
  "تعداد بازدید",
  "تصویر",
  "مطلب",
  "تاریخ ایجاد",
  "تاریخ بروزرسانی",
  "",
];

export default function Articles() {
  const [formVisible, setFormVisible] = useState(false);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const { articles, deleteArticle, getArticle, selectedArticle } =
    useArticles();
  const handleCreateForm = () => {
    setFormVisible(!formVisible);
  };
  function handleDelete(e, id) {
    e.preventDefault();
    deleteArticle(id);
  }
  function handleEdit(e, id) {
    e.preventDefault();
    getArticle(id);
  }
  useEffect(() => {
    if (selectedArticle) {
      setUpdateFormVisible(true);
    }
  }, [selectedArticle]);
  return (
    <div className="w-full h-full">
      <CreateArticleForm visible={formVisible} setVisible={setFormVisible} />
      <UpdateArticleForm
        visible={updateFormVisible}
        setVisible={setUpdateFormVisible}
        articleValues={selectedArticle}
      />
      <div className="categories-container w-full h-full p-4">
        <h2 className="font-bold text-mainBlue text-2xl block mb-4">
          لیست مقالات
        </h2>
        <SimpleButton text="افزودن مقاله جدید" onClick={handleCreateForm}>
          <FaPlus />
        </SimpleButton>
        {articles.length === 0 ? (
          <NoItemsFound />
        ) : (
          <Table tableHeaders={tableHeaders}>
            {articles.map((item) => (
              <tr key={item.id} className="border-b-2 border-gray-200">
                <td>{item.title}</td>
                <td>{item.user?.fullName}</td>
                <td>{item.numViews}</td>
                <td>
                  <img className="w-12 h-12" src={item.url} alt={item.title} />
                </td>
                <td>{item.content}</td>
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
