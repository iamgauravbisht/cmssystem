const express = require("express");
const {
  verifyUser,
  findTablesbyId,
  deleteTable,
  insertData,
  createTable,
  updateTable,
  findColumns,
  getTable,
  getTableRowData,
} = require("../db/index.js");

const router = express.Router();

router.post("/create", async (req, res) => {
  const token = req.body.token;
  const { tableName, attributes } = req.body;
  if (!token || !tableName || !attributes) {
    return res.status(401).json({
      message: "Invalid token or table name or attributes",
    });
  }
  const response = await verifyUser(token);
  if (response.message.includes("Invalid")) {
    return res.status(401).json({
      message: "Invalid token 1",
    });
  }
  const userId = response.userId;
  if (!userId) {
    return res.status(401).json({
      message: "No user found",
    });
  }
  const table = await createTable(userId, tableName, attributes);

  if (table.message.includes("successfully")) {
    return res.json({
      message: "Table created successfully",
    });
  } else {
    return res.status(401).json({
      table: table,
      message: "Error creating table",
    });
  }
});

router.post("/all", async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(401).json({
      message: "Invalid token 1",
    });
  }
  const response = await verifyUser(token);
  if (response.message.includes("Invalid")) {
    return res.status(401).json({
      message: "Invalid token 2",
    });
  }
  const userId = response.userId;
  if (!userId) {
    return res.status(401).json({
      message: "No user found",
    });
  }
  const tables = await findTablesbyId(userId);
  if (tables.message.includes("No")) {
    return res.json({
      message: "No tables found",
    });
  }
  // console.log(tables.row.length, tables.row);
  // if (tables.row.length == 0) {
  //   return res.status(401).json({
  //     message: "Zero tables found",
  //   });
  // }
  res.json({
    message: "Tables found successfully",
    tables: tables.row,
  });
});

router.get("/columns/:tableName", async (req, res) => {
  const { tableName } = req.params;
  if (!tableName) {
    return res.status(401).json({
      message: "Invalid table name",
    });
  }
  const columns = await findColumns(tableName);
  if (columns.message.includes("No")) {
    return res.status(401).json({
      message: "No columns found",
    });
  }
  res.json({
    message: "Columns found",
    columns: columns.row,
  });
});

router.post("/insert", async (req, res) => {
  const { token, tableName, data } = req.body;
  if (!token || !tableName || !data) {
    return res.status(401).json({
      message: "Invalid token or tableName or data",
    });
  }
  const response = await verifyUser(token);
  if (response.message.includes("Invalid")) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
  const userId = response.userId;
  if (!userId) {
    return res.status(401).json({
      message: "No user found",
    });
  }
  const insert = await insertData(tableName, data);
  if (insert.message.includes("successfully")) {
    return res.json({
      message: "Data inserted successfully",
    });
  } else {
    return res.status(401).json({
      message: "Error inserting data",
    });
  }
});

router.post("/tableData", async (req, res) => {
  const { token, tableName } = req.body;

  if (!token || !tableName) {
    return res.status(401).json({
      message: "Invalid token or tableName",
    });
  }
  const response = await verifyUser(token);
  if (response.message.includes("Invalid")) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
  const userId = response.userId;
  if (!userId) {
    return res.status(401).json({
      message: "No user found",
    });
  }
  const table = await getTable(tableName);
  if (table.message.includes("Error")) {
    return res.status(401).json({
      message: "No Table found",
    });
  }
  res.json({
    message: "Table found success",
    table: table,
  });
});

router.post("/update", async (req, res) => {
  const { tableName, rowId, row, token } = req.body;
  if (!tableName || !rowId || !row || !token) {
    return res.status(401).json({
      message: "Invalid tableName or columnId or col",
    });
  }
  const response = await verifyUser(token);
  if (response.message.includes("Invalid")) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
  const userId = response.userId;
  if (!userId) {
    return res.status(401).json({
      message: "No user found",
    });
  }
  const table = await updateTable(tableName, rowId, row);
  if (table.message.includes("successfully")) {
    return res.json({
      message: "Table updated successfully",
    });
  } else {
    return res.status(401).json({
      message: "Error updating table",
    });
  }
});

router.post("/delete", async (req, res) => {
  const { token, tableName } = req.body;

  if (!token || !tableName) {
    return res.status(401).json({
      message: "Invalid token or tableName",
    });
  }
  const response = await verifyUser(token);
  if (response.message.includes("Invalid")) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
  const userId = response.userId;
  if (!userId) {
    return res.status(401).json({
      message: "No user found",
    });
  }
  const table = await deleteTable(userId, tableName);
  if (table.message.includes("successfully")) {
    return res.json({
      message: "Table deleted successfully",
    });
  } else {
    return res.status(401).json({
      message: "Error deleting table",
    });
  }
});

router.post("/row", async (req, res) => {
  const { token, tableName, rowId } = req.body;
  if (!token || !tableName || !rowId) {
    return res.status(401).json({
      message: "Invalid token or tableName or rowId",
    });
  }
  const response = await verifyUser(token);
  if (response.message.includes("Invalid")) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
  const userId = response.userId;
  if (!userId) {
    return res.status(401).json({
      message: "No user found",
    });
  }
  const data = await getTableRowData(tableName, rowId);
  if (data.message.includes("Error")) {
    return res.status(401).json({
      message: "No Table found",
    });
  }
  console.log(data);
  res.json({
    message: "Table found success",
    table: data,
  });
});

module.exports = router;
