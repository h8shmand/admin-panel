export default function Table({ tableHeaders, children }) {
  return (
    <div className="block w-full overflow-x-auto mt-10 overflow-y-auto h-[75%]">
      <table className="w-full table-fixed min-w-[1236px]">
        <thead>
          <tr className="border-b-2 border-gray-500 dark:border-gray-200">
            {tableHeaders.map((item, index) => (
              <th
                key={index}
                className={`w-[${Math.round(
                  100 / tableHeaders.length
                )}%] text-start dark:text-white`}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
