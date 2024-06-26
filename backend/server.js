const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { json } = require("body-parser");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utils/db");

const port = process.env.PORT;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/dashboard/categoryRoutes"));
dbConnect();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Server running on port ${port}!`));
