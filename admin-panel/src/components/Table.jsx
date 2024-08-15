export default function Table({ tableHeaders, children }) {
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
        {children}
      </table>
    </div>
  );
}
