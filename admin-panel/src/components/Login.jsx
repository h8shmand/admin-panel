import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { PiWarningOctagonFill } from "react-icons/pi";
import FormikInput from "./formikInputs/FormikInput";
import axios from "axios";
import Loader from "./Loader";

import { useAuth } from "./context/AuthProvider";
const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("لطفا یک ایمیل معتبر وارد کنید")
    .required("ایمیل را وارد کنید"),
  password: Yup.string()
    .required("گذرواژه را وارد کنید")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "گذرواژه شامل حداقل 8 کاراکتر شامل حروف  کوچک و حداقل یک حرف بزرگ، عدد و علامت است"
    ),
});

export default function Login() {
  const { login, isLoading } = useAuth();

  const onSubmit = async (values) => {
    login(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });
  return (
    <div className="login-container w-screen m-0 h-screen flex items-center justify-center bg-gray-300">
      {isLoading && <Loader />}
      <div className="form-container sm:w-[40%] w-3/4 bg-white h-fit rounded-lg flex flex-col items-center ">
        <h2 className="my-4 text-xl text-mainBlue">ورود به پنل ادمین</h2>
        <img src="logo/IranSigLOGO.svg" alt="logo" className="w-20 h-20" />
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col w-full items-center "
        >
          <FormikInput label={"ایمیل"} name={"email"} formik={formik} />
          <FormikInput
            label={"گذرواژه"}
            name={"password"}
            formik={formik}
            type="password"
          />
          <button
            disabled={!formik.isValid}
            type="submit"
            className="w-fit py-1 px-6 bg-mainBlue rounded flex items-center text-white my-8"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}
