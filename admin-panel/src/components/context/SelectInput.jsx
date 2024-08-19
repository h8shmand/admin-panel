import { PiWarningOctagonFill } from "react-icons/pi";

export default function SelectInput({
  label,
  name,
  data,
  selectedValue,
  setSeletedValue,
  errorMessage,
}) {
  return (
    <div className="w-[70%] relative">
      <label htmlFor={name} className="block text-right">
        {label}
      </label>
      <select
        name={name}
        id={name}
        onChange={(e) => setSeletedValue(e.target.value)}
        className={`border-2 outline-0 border-mainBlue rounded w-full h-10 text-sm px-2 ${
          selectedValue === "-" ? "border-red-500" : ""
        }`}
      >
        <option value="-">-انتخاب کنید-</option>
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      {selectedValue === "-" && (
        <PiWarningOctagonFill className="text-red-500 absolute top-[35px] left-[10px]" />
      )}
      {selectedValue === "-" && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
