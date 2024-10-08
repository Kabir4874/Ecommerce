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
    origin: ["http://localhost:3000", "http://localhost:3001"],
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
let allSeller = [];

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

const addSeller = (sellerId, socketId, userInfo) => {
  const checkSeller = allSeller.some((u) => u.sellerId === sellerId);
  if (!checkSeller) {
    allSeller.push({
      sellerId,
      socketId,
      userInfo,
    });
  }
};

const findCustomer = (customerId) => {
  return allCustomer.find((c) => c.customerId === customerId);
};
const findSeller = (sellerId) => {
  return allSeller.find((c) => c.sellerId === sellerId);
};

const remove = (socketId) => {
  allCustomer = allCustomer.filter((c) => c.socketId !== socketId);
  allSeller = allSeller.filter((c) => c.socketId !== socketId);
};

const removeAdmin = (socketId) => {
  if (admin.socketId === socketId) {
    admin = {};
  }
};

let admin = {};

io.on("connection", (soc) => {
  console.log("Socket server is running");
  soc.on("add_user", (customerId, userInfo) => {
    addUser(customerId, soc.id, userInfo);
    io.emit("activeCustomer", allCustomer);
    io.emit("activeSeller", allSeller);
  });
  soc.on("add_seller", (sellerId, userInfo) => {
    addSeller(sellerId, soc.id, userInfo);
    io.emit("activeSeller", allSeller);
    io.emit("activeCustomer", allCustomer);
    io.emit("activeAdmin", { status: true });
  });
  soc.on("add_admin", (adminInfo) => {
    delete adminInfo.email;
    admin = adminInfo;
    admin.socketId = soc.id;
    io.emit("activeSeller", allSeller);
    io.emit("activeAdmin", { status: true });
  });
  soc.on("send_seller_message", (msg) => {
    const customer = findCustomer(msg.receiverId);
    if (customer !== undefined) {
      soc.to(customer.socketId).emit("seller_message", msg);
    }
  });
  soc.on("send_customer_message", (msg) => {
    const seller = findSeller(msg.receiverId);
    if (seller !== undefined) {
      soc.to(seller.socketId).emit("customer_message", msg);
    }
  });

  soc.on("send_message_admin_to_seller", (msg) => {
    const seller = findSeller(msg.receiverId);
    if (seller !== undefined) {
      soc.to(seller.socketId).emit("received_admin_message", msg);
    }
  });
  soc.on("send_message_seller_to_admin", (msg) => {
    if (admin.socketId) {
      soc.to(admin.socketId).emit("received_seller_message", msg);
    }
  });

  soc.on("disconnect", () => {
    console.log("user disconnect");
    remove(soc.id);
    removeAdmin(soc.id);
    io.emit("activeAdmin", { status: false });
    io.emit("activeSeller", allSeller);
    io.emit("activeCustomer", allCustomer);
  });
});
app.use(cookieParser());
app.use(express.json());
app.use("/api", require("./routes/chatRoutes"));
app.use("/api", require("./routes/bannerRoutes"));
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/home/cardRoutes"));
app.use("/api", require("./routes/home/customerAuthRoutes"));
app.use("/api", require("./routes/dashboard/categoryRoutes"));
app.use("/api", require("./routes/dashboard/productRoutes"));
app.use("/api", require("./routes/dashboard/sellerRoutes"));
app.use("/api", require("./routes/dashboard/dashboardIndexRoutes"));
app.use("/api/home", require("./routes/home/homeRoutes"));
app.use("/api", require("./routes/order/orderRoutes"));
app.use("/api", require("./routes/paymentRoutes"));
dbConnect();

app.get("/", (req, res) => res.send("Hello World!"));
server.listen(port, () => console.log(`Server running on port ${port}!`));
