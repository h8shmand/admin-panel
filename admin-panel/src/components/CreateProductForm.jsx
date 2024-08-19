import { useFormik } from "formik";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";
import FormikInput from "./formikInputs/FormikInput";
import FormikImageInput from "./formikInputs/FormikImageInput";
import FormikTextArea from "./formikInputs/FormikTextArea";
import { useAuth } from "./context/AuthProvider";
import { useProducts } from "./context/ProductsProvider";
import { usecategories } from "./context/CategoriesProvider";
import SelectInput from "./context/SelectInput";
const initialValues = {
  title: "",
  image: "",
  description: "",
};
const validationSchema = Yup.object({
  title: Yup.string().required("نام محصول را وارد کنید"),
  image: Yup.mixed().required("تصویر را انتخاب کنید"),
  description: Yup.string()
    .min(6, "توضیحات باید حداقل شامل 6 کاراکتر باشد")
    .required("توضیحات را وارد کنید"),
});

export default function CreateProductForm({ visible, setVisible }) {
  const { createProduct } = useProducts();
  const { categories } = usecategories();
  const [categoryId, setCategoryId] = useState("");

  const handleCloseForm = (e) => {
    if (e.target === e.currentTarget) {
      setVisible(false);
    }
  };
  const onSubmit = async (values) => {
    createProduct({ ...values, categoryId });
    setVisible(false);

    console.log(values);
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
      className={`back-drop bg-black/20 w-full h-full backdrop-blur z-10 absolute flex items-center justify-center ${
        visible ? "" : "hidden"
      }`}
    >
      <div className="w-[85%] h-fit bg-white rounded-lg relative z-20 shadow-light">
        <button
          onClick={handleCloseForm}
          className="absolute right-2 top-2 w-fit h-fit"
        >
          <FaTimes className="text-mainBlue pointer-events-none" />
        </button>
        <h2 className="text-xl text-mainBlue block w-full pr-6 mt-10">
          افزودن محصول
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col w-full items-center mt-6 "
        >
          <FormikInput label={"نام محصول"} name={"title"} formik={formik} />

          <SelectInput
            name={"selectCategory"}
            label={"دسته بندی"}
            data={categories}
            selectedValue={categoryId}
            setSeletedValue={setCategoryId}
            errorMessage={"دسته بندی را انتخاب کنید"}
          />
          <FormikImageInput
            label={"تصویر محصول"}
            name={"image"}
            formik={formik}
          />
          <FormikTextArea
            label={"توضیحات محصول"}
            name={"description"}
            formik={formik}
            className="h-24"
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
