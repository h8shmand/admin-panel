import { useFormik } from "formik";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";
import FormikInput from "../formikInputs/FormikInput";
import FormikImageInput from "../formikInputs/FormikImageInput";
import FormikTextArea from "../formikInputs/FormikTextArea";
import { useArticles } from "../context/ArticlesProvider";

const validationSchema = Yup.object({
  title: Yup.string().required("عنوان مقاله را وارد کنید"),
  image: Yup.mixed(),
  content: Yup.string()
    .min(6, "مطلب باید حداقل شامل 6 کاراکتر باشد")
    .required("مطلب را وارد کنید"),
});
export default function UpdateArticleForm({
  visible,
  setVisible,
  articleValues,
}) {
  const { updateArticle, discardSelectedArticle } = useArticles();
  const initialValues = {
    title: articleValues?.title,
    image: articleValues?.image,
    content: articleValues?.content,
  };
  const handleCloseForm = (e) => {
    if (e.target === e.currentTarget) {
      setVisible(false);
      discardSelectedArticle();
    }
  };
  const onSubmit = async (values) => {
    updateArticle(values, articleValues.id);
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
          ویرایش مقاله
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
