import useMyContext from "../../store/MyContext";
import { deleteTable } from "../../lib/table";

export default function Toolkit({ openDrawer }: { openDrawer: () => void }) {
  const { state, dispatch } = useMyContext();
  const deleteHandle = async () => {
    const res = await deleteTable(state.tableName);
    if (res.message.includes("success")) {
      dispatch({ type: "SET_TABLE_NAME", payload: "" });
      dispatch({ type: "SET_TABLE_ID", payload: "" });
      window.location.reload();
    }
  };
  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8 w-[90%] ">
      <div className="flex flex-row gap-2 ">
        <button
          type="button"
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-1.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          onClick={openDrawer}
        >
          Insert
        </button>
        <div className="flex-1 overflow-x-auto flex flex-row ">
          {state.tableName.length > 0 && (
            <TableName
              name={state.tableName}
              id={state.tableId}
              key={state.tableId}
            />
          )}
        </div>
        {state.tableName.length > 0 && (
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={deleteHandle}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

function TableName({ name, id }: { name: string; id: string }) {
  return (
    <button
      type="button"
      className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
      id={id}
    >
      {name}
    </button>
  );
}
