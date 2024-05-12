const findTables = async (client, userId) => {
  try {
    await client.query("BEGIN");
    const tables = await client.query(
      `SELECT * FROM "TablesList" WHERE OwnerId = $1`,
      [userId]
    );
    await client.query("COMMIT");
    if (tables.rows.length == 0) {
      return { message: "zero tables found" };
    }
    return {
      message: "Tables found",
      row: tables.rows,
    };
  } catch (err) {
    await client.query("ROLLBACK");
    return {
      message: "No tables found",
    };
  }
};
const createTableLogic = async (client, userId, tableName, attributes) => {
  let attributesString = "";
  attributes.forEach((element) => {
    attributesString += `${element.name} ${element.datatype}, `;
  });
  attributesString = attributesString.slice(0, -2);
  try {
    await client.query("BEGIN");
    const listTable = await client.query(
      `INSERT INTO "TablesList" (OwnerId, name) VALUES ($1, $2) RETURNING *`,
      [userId, tableName]
    );

    const createdTable = await client.query(
      `CREATE TABLE "${tableName}" (
          id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
          ${attributesString}
      )`
    );
    await client.query("COMMIT");
    return {
      message: "Table created successfully",
    };
  } catch (err) {
    await client.query("ROLLBACK");
    return {
      error: err,
      message: "Error creating table",
    };
  }
};
const deleteTableLogic = async (client, userId, tableName) => {
  console.log("userId : ", userId);
  console.log("tableName : ", tableName);
  try {
    await client.query("BEGIN");
    const unListTable = await client.query(
      `DELETE FROM "TablesList" WHERE OwnerId = $1 AND name = $2`,
      [userId, tableName]
    );
    const dropTable = await client.query(`DROP TABLE "${tableName}"`);
    await client.query("COMMIT");
    return {
      message: "Table deleted successfully",
    };
  } catch (err) {
    await client.query("ROLLBACK");
    return {
      message: "Error deleting table",
    };
  }
};
const findColumnsLogic = async (client, tableName) => {
  try {
    await client.query("BEGIN");
    const columns = await client.query(
      `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1`,
      [tableName]
    );
    await client.query("COMMIT");
    return {
      message: "Columns found",
      row: columns.rows,
    };
  } catch (err) {
    await client.query("ROLLBACK");
    return {
      error: err,
      message: "No columns found",
    };
  }
};
const insertDataLogic = async (client, tableName, data) => {
  console.log("data : ", data);
  console.log("tableName : ", tableName);
  try {
    await client.query("BEGIN");
    const columnNames = data
      .filter((d) => d.colName !== "id")
      .map((d) => d.colName)
      .join(", ");

    const dataValues = data
      .filter((d) => d.colName !== "id")
      .map((d) => `'${d.value}'`)
      .join(", ");
    const query = `INSERT INTO "${tableName}" (${columnNames}) VALUES (${dataValues})`;
    const insertData = await client.query(query);

    await client.query("COMMIT");

    return {
      message: "Data inserted successfully",
    };
  } catch (err) {
    await client.query("ROLLBACK");
    console.log("Error inserting data : ", err);
    return {
      message: "Error inserting data",
    };
  }
};

const updateTableLogic = async (client, tableName, rowId, row) => {
  try {
    const dataValueString = row
      .filter((r) => r.colName !== "id")
      .map((r) => {
        return `${r.colName} = '${r.value}'`;
      })
      .join(", ");
    console.log("dataValueString : ", dataValueString);
    await client.query("BEGIN");
    const updateColumn = await client.query(
      `UPDATE "${tableName}" SET ${dataValueString}  WHERE id = $1`,
      [rowId]
    );
    await client.query("COMMIT");
    return {
      message: "Table updated successfully",
    };
  } catch (err) {
    await client.query("ROLLBACK");
    return {
      message: "Error updating table",
    };
  }
};

const getTableLogic = async (client, tableName) => {
  try {
    await client.query("BEGIN");
    const table = await client.query(`SELECT * FROM "${tableName}"`);
    await client.query("COMMIT");
    return {
      message: "Table found",
      row: table.rows,
    };
  } catch (err) {
    await client.query("ROLLBACK");
    return {
      message: "Error finding table",
    };
  }
};

const getTableRowDataLogic = async (client, tableName, rowId) => {
  try {
    await client.query("BEGIN");
    const table = await client.query(
      `SELECT * FROM "${tableName}" WHERE id = $1`,
      [rowId]
    );
    await client.query("COMMIT");
    return {
      message: "Table found ",
      row: table.rows,
    };
  } catch (err) {
    await client.query("ROLLBACK");
    return {
      message: "Error finding table",
    };
  }
};

module.exports = {
  findTables,
  createTableLogic,
  deleteTableLogic,
  findColumnsLogic,
  insertDataLogic,
  updateTableLogic,
  getTableLogic,
  getTableRowDataLogic,
};
