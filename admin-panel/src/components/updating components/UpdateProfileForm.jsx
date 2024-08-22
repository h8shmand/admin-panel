import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";
import FormikInput from "../formikInputs/FormikInput";
import SelectInput from "../SelectInput";
import { useUsers } from "../context/UsersProvider";
import FormikImageInput from "../formikInputs/FormikImageInput";
import { useNavigate } from "react-router-dom";
const roles = [
  { name: "مدیر", id: 1 },
  { name: "نویسنده", id: 0 },
];

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
  image: Yup.mixed(),
});
export default function UpdateProfileForm() {
  const navigate = useNavigate();
  const { updateProfile, selectedProfile } = useUsers();
  if (!window.location.href.endsWith("/updateProfile")) {
    return null;
  }

  const initialValues = {
    fullName: selectedProfile?.fullName,
    email: selectedProfile?.email,
    image: "",
    password: "",
    confPassword: "",
  };
  const [role, setRole] = useState("");
  useEffect(() => setRole(selectedProfile?.isAdmin ? 1 : 0), [selectedProfile]);
  const onSubmit = async (values) => {
    updateProfile(values, selectedProfile.id);
    navigate("/dashboard");
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
      className={`back-drop bg-black/20 dark:bg-black/80 w-full h-full backdrop-blur z-10 absolute flex items-center justify-center`}
    >
      <div className="w-[85%] h-[92%] bg-white dark:bg-darkBody rounded-lg relative z-20 shadow-light overflow-y-auto">
        <h2 className="text-xl text-mainBlue dark:text-white block w-full pr-6 mt-10">
          ویرایش پروفایل
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
          <FormikInput
            name={"email"}
            label={"ایمیل"}
            formik={formik}
            disabled="disabled"
          />
          <SelectInput
            name={"selectRole"}
            label={"نقش"}
            data={roles}
            disabled="disabled"
            selected={selectedProfile?.isAdmin ? 1 : 0}
            selectedValue={role}
            setSeletedValue={setRole}
            errorMessage={"نقش را انتخاب کنید"}
          />
          <FormikImageInput label={"آواتار"} name={"image"} formik={formik} />
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

          <button
            disabled={!formik.isValid}
            type="submit"
            className="w-fit py-1 px-6 bg-mainBlue rounded flex items-center text-white my-8"
          >
            ویرایش
          </button>
        </form>
      </div>
    </div>
  );
}
