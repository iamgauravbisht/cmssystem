import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { createTable } from "../../lib/table";

type TableAttribute = {
  id: string;
  name: string;
  dataType: string;
};
export default function Ctable({
  openDrawer,
  closeDrawer,
}: {
  openDrawer: boolean;
  closeDrawer: () => void;
}) {
  const [table, setTable] = useState("");
  const [allAttributes, setAllAttributes] = useState<TableAttribute[]>([]);

  const addNewAttribute = () => {
    const newAttribute = {
      id: Date.now().toLocaleString(),
      name: "name",
      dataType: "Int",
    };
    setAllAttributes((p) => [...p, newAttribute]);
  };

  const handleUpdate = (id: string, data: TableAttribute) => {
    const newAttributes = allAttributes.map((attribute) => {
      if (attribute.id == id) {
        return {
          id: attribute.id,
          name: data.name,
          dataType: data.dataType,
        };
      }
      return attribute;
    });
    setAllAttributes(newAttributes);
  };

  const handleRemove = (id: string) => {
    const newAttributes = allAttributes.filter(
      (attribute) => attribute.id !== id
    );
    setAllAttributes(newAttributes);
  };

  const handleSubmit = async () => {
    const Attributes = allAttributes.map((attribute) => {
      return {
        name: attribute.name,
        datatype: attribute.dataType,
      };
    });
    try {
      const response = await createTable(table, Attributes);
      if (response.message.includes("successfully")) {
        toast.success("Table Created Successfully");
        closeDrawer();
        window.location.reload();
      } else {
        toast.error("Error while creating table");
      }
    } catch (error) {
      toast.error("Error while creating table");
    }
  };

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
        Create Table
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
        <label
          htmlFor="table-name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Table Name
        </label>
        <input
          type="text"
          id="table-name"
          className="block w-full px-3 py-2 text-sm text-gray-900 dark:text-gray-200 bg-gray-100 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none focus:ring-opacity-50"
          value={table}
          onChange={(e) => setTable(e.target.value)}
        />
        {allAttributes.map((a) => {
          return (
            <CreateAtrribute
              key={a.id}
              handleUpdate={handleUpdate}
              id={a.id}
              handleRemove={handleRemove}
            />
          );
        })}
        <button
          type="button"
          className="w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none focus:ring-opacity-50"
          onClick={addNewAttribute}
        >
          Add Attribute
        </button>
        <button
          type="button"
          className="w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none focus:ring-opacity-50"
          onClick={handleSubmit}
        >
          Create
        </button>
      </div>
    </div>
  );
}

function CreateAtrribute({
  id,
  handleUpdate,
  handleRemove,
}: {
  id: string;
  handleUpdate: (id: string, data: TableAttribute) => void;
  handleRemove: (id: string) => void;
}) {
  const [name, setName] = useState("");
  const [dataType, setDataType] = useState("VARCHAR(255)");

  useEffect(() => {
    handleUpdate(id, { id, name, dataType });
  }, [name, dataType, id]);

  return (
    <>
      <label
        htmlFor="attribute-name"
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        Attribute Value
      </label>
      <input
        type="text"
        id="attribute-name"
        className="block w-full px-3 py-2 text-sm text-gray-900 dark:text-gray-200 bg-gray-100 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none focus:ring-opacity-50"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex gap-1 items-end">
        <div className="flex-1">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Datatype
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
          >
            <option>INT</option>
            <option>VARCHAR(255)</option>
            <option>VARCHAR(20)</option>
            <option>DATE</option>
          </select>
        </div>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none focus:ring-opacity-50"
          onClick={() => handleRemove(id)}
        >
          Remove
        </button>
      </div>
    </>
  );
}
