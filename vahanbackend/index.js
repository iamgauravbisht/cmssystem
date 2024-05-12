const express = require("express");
const authRouter = require("./routes/auth.js");
const tableRouter = require("./routes/table.js");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/table", tableRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
