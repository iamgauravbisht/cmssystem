import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { updateTable, getTableRowData } from "../../lib/table";
import useMyContext from "../../store/MyContext";

type TableAttribute = {
  id: string;
  name: string;
  value: string;
};
export default function Utable({
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
      if (c.id === id) {
        return { ...c, value };
      }
      return c;
    });
    setCol(newCol);
  };
  const handleSubmit = async () => {
    try {
      if (state.tableName && state.rowId) {
        const row = col.map((c) => {
          return { colName: c.name, value: c.value };
        });
        const res = await updateTable(state.tableName, state.rowId, row);
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
      }
    } catch (error) {
      toast.error("Error while updating row");
    }
  };
  useEffect(() => {
    async function fetchColumns() {
      if (state.tableName && state.rowId) {
        const response = await getTableRowData(state.tableName, state.rowId);
        if (response.message.includes("success")) {
          const data = response.table.row[0];
          const col = Object.keys(data).map((key) => {
            return {
              id:
                Date.now().toLocaleString() +
                Math.floor(Math.random() * 1000000 + 1),
              name: key,
              value: data[key],
            };
          });
          setCol(col);
        }
      }
    }
    fetchColumns();
  }, [state.rowId, state.tableName]);

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
        Update Row
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
      <div className="space-y-4">
        {col.map((c) => {
          if (c.name === "id") return null;
          return (
            <Coloumn
              key={c.id}
              name={c.name}
              handleUpdate={handleUpdate}
              id={c.id}
              value={c.value}
            />
          );
        })}

        <button
          type="button"
          className="w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none focus:ring-opacity-50"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
}

function Coloumn({
  id,
  name,
  handleUpdate,
  value,
}: {
  id: string;
  name: string;
  value: string;
  handleUpdate: (id: string, value: string) => void;
}): JSX.Element {
  return (
    <div className="space-y-4">
      <label
        htmlFor="table-name"
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {name}
      </label>
      <input
        type="text"
        id="table-name"
        className="block w-full px-3 py-2 text-sm text-gray-900 dark:text-gray-200 bg-gray-100 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none focus:ring-opacity-50"
        placeholder="Value"
        value={value}
        onChange={(e) => handleUpdate(id, e.target.value)}
      />
    </div>
  );
}
