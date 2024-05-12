import { useEffect, useState } from "react";
import useMyContext from "../../store/MyContext";
import { getTableData } from "../../lib/table";

export default function TableFrame({ openDrawer }: { openDrawer: () => void }) {
  const { state, dispatch } = useMyContext();
  const [colName, setColName] = useState<string[]>([]);
  const [colData, setColData] = useState<string[]>([]);

  const handleEdit = async (id: string) => {
    dispatch({ type: "SET_ROW_ID", payload: id });
    openDrawer();
  };

  useEffect(() => {
    function convertToDateString(dateString: string) {
      const dateObj = new Date(dateString);
      const day = dateObj.getDate();
      const month = dateObj.getMonth();
      const year = dateObj.getFullYear();
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      return `${day}-${monthNames[month]}-${year}`;
    }

    async function fetchTableData() {
      if (state.tableName === "") return;
      setColData([]);
      setColName([]);
      const response = await getTableData(state.tableName);
      if (response.message.includes("success")) {
        const data = response.table.row;
        const colName = Object.keys(data[0]);
        const colData = data.map((d) => {
          return Object.values(d).map((value) => {
            if (
              typeof value === "string" &&
              /\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?)?Z/.test(value)
            ) {
              value = convertToDateString(value);
            }
            return value;
          });
        });
        setColName(colName);
        setColData(colData);
      }
    }
    fetchTableData();
  }, [state.tableName]);

  return (
    <div className="overflow-auto ">
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            {colName.map((name, index) => (
              <th key={index} className="py-3 px-6 text-left">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {colData.length > 0 &&
            colData.map((data, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                {Array.isArray(data) &&
                  data.map((d: any, index: number) => (
                    <td
                      key={index}
                      className="py-3 px-6 text-left whitespace-nowrap"
                    >
                      {d}
                    </td>
                  ))}
                <td className="py-3 px-6 text-center">
                  <button
                    className="bg-blue-500 text-white rounded-md px-4 py-2"
                    onClick={() => handleEdit(data[0])}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
