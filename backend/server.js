const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utils/db");
const http = require("http");
const socket = require("socket.io");

const server = http.createServer(app);

const port = process.env.PORT;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

let allCustomer = [];

const addUser = (customerId, socketId, userInfo) => {
  const checkUser = allCustomer.some((u) => u.customerId === customerId);
  if (!checkUser) {
    allCustomer.push({
      customerId,
      socketId,
      userInfo,
    });
  }
};

io.on("connection", (soc) => {
  console.log("Socket server is running");
  soc.on("add_user", (customerId, userInfo) => {
    addUser(customerId, soc.id, userInfo);
  });
});
app.use(cookieParser());
app.use(express.json());
app.use("/api", require("./routes/chatRoutes"));
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/home/cardRoutes"));
app.use("/api", require("./routes/home/customerAuthRoutes"));
app.use("/api", require("./routes/dashboard/categoryRoutes"));
app.use("/api", require("./routes/dashboard/productRoutes"));
app.use("/api", require("./routes/dashboard/sellerRoutes"));
app.use("/api/home", require("./routes/home/homeRoutes"));
app.use("/api/home", require("./routes/order/orderRoutes"));
dbConnect();

app.get("/", (req, res) => res.send("Hello World!"));
server.listen(port, () => console.log(`Server running on port ${port}!`));
