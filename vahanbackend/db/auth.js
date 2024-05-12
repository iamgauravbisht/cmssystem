const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");

const createUserLogic = async (client, username, email, password) => {
  try {
    await client.query("BEGIN");

    const existingUser = await client.query(
      `SELECT * FROM "User" WHERE email = $1`,
      [email]
    );

    if (existingUser.rows.length > 0) {
      throw new Error("Email already taken/Incorrect inputs");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await client.query(
      `INSERT INTO "User" (username, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [username, email, hashedPassword]
    );

    const userId = user.rows[0].id;

    const token = jwt.sign(
      {
        userId,
        email,
      },
      JWT_SECRET
    );

    await client.query("COMMIT");

    return {
      message: "User created successfully",
      token: token,
    };
  } catch (e) {
    await client.query("ROLLBACK");
    console.log(e);
    return {
      message: "Email already taken / Incorrect inputs",
    };
  }
};

const loginUserLogic = async (client, email, password) => {
  try {
    await client.query("BEGIN");

    const user = await client.query(`SELECT * FROM "User" WHERE email = $1`, [
      email,
    ]);

    if (user.rows.length == 0) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        userId: user.rows[0].id,
        email: user.rows[0].email,
      },
      JWT_SECRET
    );

    await client.query("COMMIT");

    return {
      message: "User logged in successfully",
      token: token,
    };
  } catch (e) {
    await client.query("ROLLBACK");
    return {
      message: "Invalid credentials",
    };
  }
};

const verifyToken = async (client, token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await client.query(
      `SELECT * FROM "User" WHERE id = $1 AND email = $2`,
      [decoded.userId, decoded.email]
    );

    if (user.rows.length === 0) {
      throw new Error("Invalid token");
    }

    return {
      userId: user.rows[0].id,
      email: user.rows[0].email,
      message: "Token verified",
    };
  } catch (e) {
    return {
      message: "Invalid token",
    };
  }
};

module.exports = {
  createUserLogic,
  loginUserLogic,
  verifyToken,
};
