import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { insertRow, getTableColumns } from "../../lib/table";
import useMyContext from "../../store/MyContext";

type TableAttribute = {
  id: string;
  name: string;
  value: string;
  datatype: string;
};
export default function Itable({
  openDrawer,
  closeDrawer,
}: {
  openDrawer: boolean;
  closeDrawer: () => void;
}) {
  const { state, dispatch } = useMyContext();
  const [col, setCol] = useState<TableAttribute[]>([]);

  const handleUpdate = (id: string, value: string) => {
    const newCol = col.map((c) => {
      if (c.id == id) {
        return { id: c.id, name: c.name, value: value, datatype: c.datatype };
      }
      return c;
    });
    setCol(newCol);
  };

  const handleSubmit = async () => {
    const column = col.map((c) => {
      return { colName: c.name, value: c.value };
    });
    try {
      const res = await insertRow(state.tableName, column);
      if (res.message.includes("success")) {
        toast.success("Row Inserted Successfully");
        closeDrawer();
        const tableName = state.tableName;
        dispatch({ type: "SET_TABLE_NAME", payload: "" });
        setTimeout(() => {
          dispatch({ type: "SET_TABLE_NAME", payload: tableName });
        }, 300);
      } else {
        toast.error("Error while inserting row");
      }
    } catch (error) {
      toast.error("Error while inserting row");
    }
  };

  useEffect(() => {
    async function fetchColumns() {
      if (state.tableName === "") return;
      setCol([]);
      const response = await getTableColumns(state.tableName);
      const col = response.columns.map(
        (c: { column_name: string; data_type: string }) => {
          return {
            id:
              Date.now().toLocaleString() +
              Math.floor(Math.random() * 1000000 + 1),
            name: c.column_name,
            value: "",
            datatype: c.data_type.split(" ")[0],
          };
        }
      );
      setCol(col);
    }
    fetchColumns();
  }, [state.tableName]);

  return (
    <div
      id="drawer-example"
      className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800 
          ${openDrawer ? "translate-x-0" : ""}
          `}
    >
      <h5
        id="drawer-label"
        className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
      >
        Insert New Row
      </h5>
      <button
        type="button"
        data-drawer-hide="drawer-example"
        aria-controls="drawer-example"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        onClick={closeDrawer}
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>

      <h2 className="w-full text-center text-md font-semibold">Table Name</h2>

      <div className="space-y-4">
        {col.map((c) => {
          if (c.name == "id") return null;
          return (
            <Coloumn
              key={c.id}
              handleUpdate={handleUpdate}
              name={c.name}
              datatype={c.datatype}
              id={c.id}
            />
          );
        })}

        <button
          type="button"
          className="w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none focus:ring-opacity-50"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </div>
  );
}

function Coloumn({
  id,
  name,
  datatype,
  handleUpdate,
}: {
  id: string;
  name: string;
  datatype: string;
  handleUpdate: (id: string, value: string) => void;
}): JSX.Element {
  return (
    <div className="space-y-4">
      <label
        htmlFor="table-name"
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {name} ({datatype})
      </label>
      <input
        type="text"
        id="table-name"
        className="block w-full px-3 py-2 text-sm text-gray-900 dark:text-gray-200 bg-gray-100 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none focus:ring-opacity-50"
        placeholder={datatype.includes("date") ? "YYYY-MM-DD" : ""}
        onChange={(e) => handleUpdate(id, e.target.value)}
      />
    </div>
  );
}
