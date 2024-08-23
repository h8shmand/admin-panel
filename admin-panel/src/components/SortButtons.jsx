import { TbSortAscendingLetters } from "react-icons/tb";
import { TbSortDescendingLetters } from "react-icons/tb";
export default function SortButtons({
  sortby,
  setSortBy,
  ascDesc,
  setAscDesc,
}) {
  return (
    <div className="flex flex-row items-center max-[470px]:flex-col">
      <p className="dark:text-white ml-2">مرتب سازی براساس:</p>

      <div className="flex flex-row">
        <button
          className="dark:bg-gray-500 bg-mainBlue text-white h-6 w-8 flex justify-center items-center rounded-br-lg rounded-tr-lg border-l-[0.5px]"
          onClick={() => setAscDesc(ascDesc === "asc" ? "desc" : "asc")}
        >
          {ascDesc === "asc" ? (
            <TbSortAscendingLetters className="text-xl" />
          ) : (
            <TbSortDescendingLetters className="text-xl" />
          )}
        </button>
        <button
          className={`dark:bg-gray-500 bg-mainBlue ${
            sortby === "name" ? "bg-[#014d61] dark:bg-gray-700" : ""
          } text-white min-w-[50px] border-l-[0.5px]`}
          onClick={() => {
            setSortBy("name");
          }}
        >
          نام
        </button>
        <button
          className={`dark:bg-gray-500 bg-mainBlue ${
            sortby === "date" ? "bg-[#014d61] dark:bg-gray-700" : ""
          } text-white min-w-[50px] rounded-bl-lg rounded-tl-lg border-r-[0.5px]`}
          onClick={() => {
            setSortBy("date");
          }}
        >
          تاریخ
        </button>
      </div>
    </div>
  );
}
