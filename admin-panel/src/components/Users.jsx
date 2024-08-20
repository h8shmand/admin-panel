import { FaPlus } from "react-icons/fa";
import SimpleButton from "./SimpleButton";
import Table from "./Table";
import { useEffect, useState } from "react";
import CreateUserForm from "./CreateUserForm";
import { useUsers } from "./context/UsersProvider";
import UpdateUserForm from "./updating components/UpdateUserForm";
import NoItemsFound from "./NoItemsFound";

const tableHeaders = ["نام و نام خانوادگی", "ایمیل", "نقش", "تاریخ ایجاد", ""];

export default function Users() {
  const [formVisible, setFormVisible] = useState(false);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const { users, selectedUser, getUser } = useUsers();
  const handleCreateForm = () => {
    setFormVisible(!formVisible);
  };
  function handleEdit(e, id) {
    e.preventDefault();
    getUser(id);
  }
  useEffect(() => {
    if (selectedUser) {
      setUpdateFormVisible(true);
    }
  }, [selectedUser]);
  return (
    <div className="w-full h-full">
      <CreateUserForm visible={formVisible} setVisible={setFormVisible} />
      <UpdateUserForm
        visible={updateFormVisible}
        setVisible={setUpdateFormVisible}
        userValues={selectedUser}
      />
      <div className="products-container w-full h-full p-4">
        <h2 className="font-bold text-mainBlue text-2xl block mb-4">
          لیست کاربران
        </h2>
        <SimpleButton text="افزودن کاربر جدید" onClick={handleCreateForm}>
          <FaPlus />
        </SimpleButton>
        {users.length === 0 ? (
          <NoItemsFound />
        ) : (
          <Table tableHeaders={tableHeaders}>
            {users.map((item) => (
              <tr key={item.id} className="border-b-2 border-gray-200 h-12">
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.isAdmin ? "مدیر" : "نویسنده"}</td>
                <td>-</td>
                <td>
                  <div className="flex flex-row items-center">
                    <button
                      className="edit-btn bg-green-500 text-white h-7 rounded-lg w-14 ml-2"
                      onClick={(e) => handleEdit(e, item.id)}
                    >
                      ویرایش
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
