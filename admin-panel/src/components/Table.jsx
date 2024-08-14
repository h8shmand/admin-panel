export default function Table({ tableHeaders }) {
  return (
    <div className="block w-full overflow-x-auto mt-10 ">
      <table className="w-full table-fixed min-w-[1247px]">
        <thead>
          <tr className="border-b-2 border-gray-500">
            {tableHeaders.map((item, index) => (
              <th
                key={index}
                className={`w-[${Math.round(
                  100 / tableHeaders.length
                )}%] text-start`}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-2 border-gray-200">
            <td
              className={`w-[${Math.round(
                100 / tableHeaders.length
              )}%] min-w-fit py-[5px] pl-[20px] whitespace-nowrap`}
            >
              خدمات و سرویس ها
            </td>
            <td
              className={`w-[${Math.round(
                100 / tableHeaders.length
              )}%] overflow-x-hidden whitespace-nowrap  py-[5px] pl-[20px]`}
            >
              <div>ما در ایران ساین با ارائه مجموعه ای از خدمات و سرویس ها</div>
            </td>
            <td
              className={`w-[${Math.round(
                100 / tableHeaders.length
              )}%] min-w-fit py-[5px] pl-[20px] whitespace-nowrap`}
            >
              <img
                className="h-11 w-11 rounded-lg"
                src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.webp"
                alt="fg"
              />
            </td>
            <td
              className={`w-[${Math.round(
                100 / tableHeaders.length
              )}%] min-w-fit py-[5px] pl-[20px] whitespace-nowrap`}
            >
              1403/02/24
            </td>
            <td
              className={`w-[${Math.round(
                100 / tableHeaders.length
              )}%] min-w-fit py-[5px] pl-[20px] whitespace-nowrap`}
            >
              1403/05/07
            </td>
            <td
              className={`flex flex-row items-center justify-center w-[${Math.round(
                100 / tableHeaders.length
              )}%] min-w-fit py-[5px] pl-[20px] whitespace-nowrap `}
            >
              <button>ویرایش</button>
              <button>حذف</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
