import { PiWarningOctagonDuotone } from "react-icons/pi";
export default function NoItemsFound() {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-row-reverse items-center bg-mainBlue p-2 rounded-lg shadow-light">
        <h3 className="text-white text-2xl mr-2">
          هیچ موردی برای نمایش وجود ندارد
        </h3>
        <PiWarningOctagonDuotone className="text-white text-2xl" />
      </div>
    </div>
  );
}
