import { useFormik } from "formik";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";
import FormikInput from "./formikInputs/FormikInput";
import FormikImageInput from "./formikInputs/FormikImageInput";
import FormikTextArea from "./formikInputs/FormikTextArea";
import { useArticles } from "./context/ArticlesProvider";
const initialValues = {
  title: "",
  image: "",
  content: "",
};
const validationSchema = Yup.object({
  title: Yup.string().required("عنوان مقاله را وارد کنید"),
  image: Yup.mixed().required("تصویر را انتخاب کنید"),
  content: Yup.string()
    .min(6, "مطلب باید حداقل شامل 6 کاراکتر باشد")
    .required("مطلب را وارد کنید"),
});
export default function CreateArticleForm({ visible, setVisible }) {
  const { createArticle } = useArticles();
  const handleCloseForm = (e) => {
    // e.preventDefault();
    if (e.target === e.currentTarget) {
      setVisible(false);
    }
  };
  const onSubmit = async (values) => {
    createArticle(values);
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
      <div className="w-[85%] h-fit bg-white dark:bg-darkBody rounded-lg relative z-20 shadow-light">
        <button
          onClick={handleCloseForm}
          className="absolute right-2 top-2 w-fit h-fit"
        >
          <FaTimes className="text-mainBlue dark:text-white pointer-events-none" />
        </button>
        <h2 className="text-xl text-mainBlue dark:text-white block w-full pr-6 mt-10">
          افزودن مقاله
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col w-full items-center mt-6 "
        >
          <FormikInput label={"عنوان مقاله"} name={"title"} formik={formik} />
          <FormikImageInput
            label={"تصویر مقاله"}
            name={"image"}
            formik={formik}
          />
          <FormikTextArea
            label={"مطلب مقاله"}
            name={"content"}
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
