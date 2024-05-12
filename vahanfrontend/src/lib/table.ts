import axios from "axios";
import { getCookie } from "./cookie";

const serverurl = "http://localhost:3000";

type TableAttributes = {
  name: string;
  datatype: string;
};

export const createTable = async (
  tableName: string,
  attributes: TableAttributes[]
) => {
  try {
    const response = await axios.post(`${serverurl}/api/table/create`, {
      tableName,
      attributes,
      token: getCookie("jwt"),
    });
    return response.data;
  } catch (error) {
    return { message: "Error while creating table" };
  }
};

export const getAllTables = async () => {
  try {
    const response = await axios.post(`${serverurl}/api/table/all`, {
      token: getCookie("jwt"),
    });
    return response.data;
  } catch (error) {
    return { message: "Error While Fetching All Tables List" };
  }
};

export const getTableData = async (tableName: string) => {
  try {
    const response = await axios.post(`${serverurl}/api/table/tableData`, {
      token: getCookie("jwt"),
      tableName,
    });
    return response.data;
  } catch (error) {
    return { message: "Error While Fetching Table Data" };
  }
};

export const getTableColumns = async (tableName: string) => {
  try {
    const response = await axios.get(
      `${serverurl}/api/table/columns/${tableName}`
    );
    return response.data;
  } catch (error) {
    return { message: "Error while fetching table columns" };
  }
};

export const insertRow = async (
  tableName: string,
  data: { colName: string; value: string }[]
) => {
  try {
    const response = await axios.post(`${serverurl}/api/table/insert`, {
      tableName,
      data,
      token: getCookie("jwt"),
    });
    return response.data;
  } catch (error) {
    return { message: "Error while inserting row" };
  }
};

export const updateTable = async (
  tableName: string,
  rowId: string,
  row: { colName: string; value: string }[]
) => {
  try {
    const response = await axios.post(`${serverurl}/api/table/update`, {
      tableName,
      rowId,
      row,
      token: getCookie("jwt"),
    });
    return response.data;
  } catch (error) {
    return { message: "Error while updating table" };
  }
};

export const getTableRowData = async (tableName: string, rowId: string) => {
  try {
    const response = await axios.post(`${serverurl}/api/table/row`, {
      tableName,
      rowId,
      token: getCookie("jwt"),
    });
    return response.data;
  } catch (error) {
    return { message: "Error while fetching table row data" };
  }
};

export const deleteTable = async (tableName: string) => {
  try {
    const response = await axios.post(`${serverurl}/api/table/delete`, {
      token: getCookie("jwt"),
      tableName,
    });

    return response.data;
  } catch (error) {
    return { message: "Error while deleting table" };
  }
};
