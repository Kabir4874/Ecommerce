const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT;

app.use('/api',require('./routes/authRoutes'));

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Server running on port ${port}!`));
