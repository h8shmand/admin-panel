import { PiWarningOctagonFill } from "react-icons/pi";

export default function FormikInput({ label, name, formik, type = "text" }) {
  return (
    <div className="w-[70%] relative">
      <label htmlFor={name} className="block text-right">
        {label}
      </label>
      <input
        name={name}
        onBlur={formik.handleBlur}
        type={type}
        className={`border-2 outline-0 border-mainBlue rounded w-full h-10 text-sm px-2 ${
          formik.errors[name] && formik.touched[name] ? "border-red-500" : ""
        }`}
        value={formik.values[name]}
        onChange={formik.handleChange}
      />
      {formik.errors[name] && formik.touched[name] && (
        <PiWarningOctagonFill className="text-red-500 absolute top-[35px] left-[10px]" />
      )}
      {formik.errors[name] && formik.touched[name] && (
        <p className="text-sm text-red-500">{formik.errors[name]}</p>
      )}
    </div>
  );
}
