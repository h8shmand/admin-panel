import { FaPlus } from "react-icons/fa";
import SimpleButton from "./SimpleButton";
import Table from "./Table";
import { useState } from "react";
import CreateUserForm from "./CreateUserForm";

const tableHeaders = ["نام و نام خانوادگی", "ایمیل", "نقش", "تاریخ ایجاد", ""];

export default function Users() {
  const [formVisible, setFormVisible] = useState(false);
  const handleCreateForm = () => {
    setFormVisible(!formVisible);
  };
  return (
    <div className="w-full h-full">
      <CreateUserForm visible={formVisible} setVisible={setFormVisible} />
      <div className="products-container w-full h-full p-4">
        <h2 className="font-bold text-mainBlue text-2xl block mb-4">
          لیست کاربران
        </h2>
        <SimpleButton text="افزودن کاربر جدید" onClick={handleCreateForm}>
          <FaPlus />
        </SimpleButton>
        <Table tableHeaders={tableHeaders}></Table>
      </div>
    </div>
  );
}
