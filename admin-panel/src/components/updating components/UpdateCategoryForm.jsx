import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";
import { useCategories } from "../context/CategoriesProvider";
import { useFormik } from "formik";
import FormikInput from "../formikInputs/FormikInput";
import FormikImageInput from "../formikInputs/FormikImageInput";
import FormikTextArea from "../formikInputs/FormikTextArea";

const validationSchema = Yup.object({
  title: Yup.string().required("نام دسته بندی را وارد کنید"),
  image: Yup.mixed(),
  description: Yup.string()
    .min(6, "توضیحات باید حداقل شامل 6 کاراکتر باشد")
    .required("توضیحات را وارد کنید"),
});
export default function UpdateCategoryForm({
  visible,
  setVisible,
  categoryValues,
}) {
  const { updateCategory, discardSelectedCategory } = useCategories();
  const initialValues = {
    title: categoryValues?.name,
    image: categoryValues?.image,
    description: categoryValues?.description,
  };
  const handleCloseForm = (e) => {
    if (e.target === e.currentTarget) {
      setVisible(false);
      discardSelectedCategory();
    }
  };
  const onSubmit = async (values) => {
    updateCategory(values, categoryValues.id);
    setVisible(false);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  return (
    <div
      onClick={handleCloseForm}
      className={`back-drop bg-black/20 dark:bg-white/20 w-full h-full backdrop-blur z-10 absolute flex items-center justify-center ${
        visible ? "" : "hidden"
      }`}
    >
      <div className="w-[85%] h-fit bg-white dark:bg-darkBody rounded-lg relative z-20 shadow-light">
        <button
          onClick={handleCloseForm}
          className="absolute right-2 top-2 w-fit h-fit"
        >
          <FaTimes className="text-mainBlue dark:text-white pointer-events-none" />
        </button>
        <h2 className="text-xl text-mainBlue dark:text-white block w-full pr-6 mt-10">
          ویرایش دسته بندی
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col w-full items-center mt-6 "
        >
          <FormikInput label={"نام دسته بندی"} name={"title"} formik={formik} />

          <FormikImageInput
            label={"تصویر دسته بندی"}
            name={"image"}
            formik={formik}
          />
          <div className="w-[70%]">
            <img
              src={categoryValues.url}
              alt={categoryValues.image}
              className="w-12 h-12 block"
            />
          </div>
          <FormikTextArea
            label={"توضیحات دسته بندی"}
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
