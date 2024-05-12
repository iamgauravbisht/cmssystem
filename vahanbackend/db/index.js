const pg = require("pg");
const { Pool } = pg;
const { createUserLogic, loginUserLogic, verifyToken } = require("./auth");
const {
  findTables,
  createTableLogic,
  deleteTableLogic,
  findColumnsLogic,
  insertDataLogic,
  updateTableLogic,
  getTableLogic,
  getTableRowDataLogic,
} = require("./table");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 5000,
});

let connectedClient = null;

const connectToDatabase = async () => {
  if (connectedClient) {
    return connectedClient;
  }

  try {
    connectedClient = await pool.connect();
    console.log("Connected to database");
    return connectedClient;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};

const createUser = async (username, email, password) => {
  const client = await connectToDatabase();
  return await createUserLogic(client, username, email, password);
};

const loginUser = async (email, password) => {
  const client = await connectToDatabase();
  return await loginUserLogic(client, email, password);
};

const verifyUser = async (token) => {
  const client = await connectToDatabase();
  return await verifyToken(client, token);
};
const findTablesbyId = async (userId) => {
  const client = await connectToDatabase();
  return await findTables(client, userId);
};
const createTable = async (userId, tableName, attributes) => {
  const client = await connectToDatabase();
  return await createTableLogic(client, userId, tableName, attributes);
};
const deleteTable = async (userId, tableName) => {
  const client = await connectToDatabase();
  return await deleteTableLogic(client, userId, tableName);
};
const findColumns = async (tableName) => {
  const client = await connectToDatabase();
  return await findColumnsLogic(client, tableName);
};
const insertData = async (tableName, data) => {
  const client = await connectToDatabase();
  return await insertDataLogic(client, tableName, data);
};
const updateTable = async (tableName, rowId, row) => {
  const client = await connectToDatabase();
  return await updateTableLogic(client, tableName, rowId, row);
};
const getTable = async (tableName) => {
  const client = await connectToDatabase();
  return await getTableLogic(client, tableName);
};

const getTableRowData = async (tableName, rowId) => {
  const client = await connectToDatabase();
  return await getTableRowDataLogic(client, tableName, rowId);
};

module.exports = {
  createUser,
  loginUser,
  verifyUser,
  findTablesbyId,
  createTable,
  deleteTable,
  findColumns,
  insertData,
  updateTable,
  getTable,
  getTableRowData,
};
