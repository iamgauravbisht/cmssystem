import Toolkit from "./Toolkit";
import TableFrame from "./TableFrame";

export default function Table({
  openInsertDrawer,
  openUpdateDrawer,
}: {
  openInsertDrawer: () => void;
  openUpdateDrawer: () => void;
}) {
  return (
    <div className="box-border max-w-7xl overflow-hidden w-full flex flex-col ">
      <Toolkit openDrawer={openInsertDrawer} />
      <TableFrame openDrawer={openUpdateDrawer} />
    </div>
  );
}
