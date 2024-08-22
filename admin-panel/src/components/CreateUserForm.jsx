import { useFormik } from "formik";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";
import FormikInput from "./formikInputs/FormikInput";
import SelectInput from "./SelectInput";
import { useUsers } from "./context/UsersProvider";
const roles = [
  { name: "مدیر", id: 1 },
  { name: "نویسنده", id: 0 },
];
const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confPassword: "",
};

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(5, "نام و نام خانوادگی باید حداقل 5 کاراکتر باشد")
    .required("نام و نام خانوادگی را وارد کنید"),
  email: Yup.string()
    .email("لطفا یک ایمیل معتبر وارد کنید")
    .required("ایمیل را وارد کنید"),
  password: Yup.string()
    .required("گذرواژه را وارد کنید")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "گذرواژه باید شامل حداقل 8 کاراکتر شامل حروف کوچک و حداقل یک حرف بزرگ، عدد و علامت باشد"
    ),
  confPassword: Yup.string()
    .required("تکرار گذرواژه را وارد کنید")
    .oneOf([Yup.ref("password"), null], "گذرواژه و تکرار آن برابر نمی باشد"),
});
export default function CreateUserForm({ visible, setVisible }) {
  const { createUser } = useUsers();
  const [role, setRole] = useState("");
  const handleCloseForm = (e) => {
    if (e.target === e.currentTarget) {
      setVisible(false);
    }
  };
  const onSubmit = async (values) => {
    createUser({ ...values, role });
    setVisible(false);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });
  return (
    <div
      onClick={handleCloseForm}
      className={`back-drop bg-black/20 dark:bg-white/20 w-full h-full backdrop-blur z-10 absolute flex items-center justify-center ${
        visible ? "" : "hidden"
      }`}
    >
      <div className="w-[85%] h-[92%] bg-white dark:bg-darkBody rounded-lg relative z-20 shadow-light overflow-y-auto">
        <button
          onClick={handleCloseForm}
          className="absolute right-2 top-2 w-fit h-fit"
        >
          <FaTimes className="text-mainBlue dark:text-white pointer-events-none" />
        </button>
        <h2 className="text-xl text-mainBlue dark:text-white block w-full pr-6 mt-10">
          افزودن کاربر
        </h2>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col w-full items-center mt-6"
        >
          <FormikInput
            name={"fullName"}
            label={"نام و نام خانوادگی"}
            formik={formik}
          />
          <FormikInput name={"email"} label={"ایمیل"} formik={formik} />
          <FormikInput
            name={"password"}
            label={"گذرواژه"}
            formik={formik}
            type="password"
          />
          <FormikInput
            name={"confPassword"}
            label={"تکرار گذرواژه"}
            formik={formik}
            type="password"
          />
          <SelectInput
            name={"selectRole"}
            label={"نقش"}
            data={roles}
            selectedValue={role}
            setSeletedValue={setRole}
            errorMessage={"نقش را انتخاب کنید"}
          />

          <button
            disabled={!formik.isValid}
            type="submit"
            className="w-fit py-1 px-6 bg-mainBlue rounded flex items-center text-white my-8"
          >
            ایجاد
          </button>
        </form>
      </div>
    </div>
  );
}
