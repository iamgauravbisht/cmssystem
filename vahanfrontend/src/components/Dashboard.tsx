import Dheader from "./ui/Dheader";
import Alltables from "./ui/Alltables";
import Ctable from "./ui/Ctable";
import Itable from "./ui/Itable";
import Utable from "./ui/Utable";
import Table from "./ui/Table";
import { useState, useEffect } from "react";
import { verify } from "../lib/auth";
import { getCookie, deleteCookie } from "../lib/cookie";

export default function Dashboard() {
  const [openCreateTable, setOpenCreateTable] = useState(false);
  const [openInsertRow, setOpenInsertRow] = useState(false);
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false);

  const openCreateTableDrawer = () => {
    setOpenCreateTable(true);
  };
  const closeCreateTableDrawer = () => {
    setOpenCreateTable(false);
  };
  const closeInsertRowDrawer = () => {
    setOpenInsertRow(false);
  };
  const openInsertRowDrawer = () => {
    setOpenInsertRow(true);
  };
  const openUpdateRowDrawer = () => {
    setOpenUpdateDrawer(true);
  };
  const closeUpdateRowDrawer = () => {
    setOpenUpdateDrawer(false);
  };

  useEffect(() => {
    // verify token
    async function verifyToken() {
      const response = await verify(getCookie("jwt"));
      if (!response.message.includes("verified")) {
        window.location.href = "/";
        deleteCookie("jwt");
      }
    }
    verifyToken();
  }, []);

  return (
    <div className="flex w-screen h-screen">
      <Ctable
        openDrawer={openCreateTable}
        closeDrawer={closeCreateTableDrawer}
      />
      <Itable openDrawer={openInsertRow} closeDrawer={closeInsertRowDrawer} />
      <Utable
        openDrawer={openUpdateDrawer}
        closeDrawer={closeUpdateRowDrawer}
      />
      <div className="flex flex-col items-center w-full h-full">
        <Dheader openDrawer={openCreateTableDrawer} />
        <Alltables openDrawer={openCreateTableDrawer} />
        <Table
          openInsertDrawer={openInsertRowDrawer}
          openUpdateDrawer={openUpdateRowDrawer}
        />
      </div>
    </div>
  );
}
