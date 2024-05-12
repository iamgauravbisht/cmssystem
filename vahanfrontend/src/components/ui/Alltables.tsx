import { useEffect, useState } from "react";
import { getAllTables } from "../../lib/table";
import useMyContext from "../../store/MyContext";

type Tables = {
  name: string;
  id: string;
};
export default function Alltables({ openDrawer }: { openDrawer: () => void }) {
  const [tables, setTables] = useState<Tables[]>([]);
  useEffect(() => {
    async function fetchAllTable() {
      const res = await getAllTables();
      if (res.message.includes("success")) {
        const data = res.tables.map((t: { name: string; id: string }) => {
          return { name: t.name, id: t.id };
        });
        setTables(data);
      }
    }
    fetchAllTable();
  }, []);

  return (
    <div className="px-4 py-4 max-w-7xl sm:px-6 lg:px-8 w-[90%]">
      <div className="flex flex-row gap-2 ">
        <button
          type="button"
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-1.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          onClick={openDrawer}
        >
          Create Table
        </button>
        <div className="flex-1 h-fit overflow-x-auto flex flex-row p-1">
          {tables.map((t) => {
            return <TableName name={t.name} id={t.id} key={t.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

function TableName({ name, id }: { name: string; id: string }) {
  const { dispatch } = useMyContext();

  const updateTableNameAndId = (name: string, id: string) => {
    dispatch({ type: "SET_TABLE_NAME", payload: name });
    dispatch({ type: "SET_TABLE_ID", payload: id });
  };

  return (
    <button
      type="button"
      className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
      id={id}
      onClick={() => {
        updateTableNameAndId(name, id);
      }}
    >
      {name}
    </button>
  );
}
