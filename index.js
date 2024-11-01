const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
const orderRouter = require("./routes/order-routes");
const bookRouter = require("./routes/book-routes");
const userRouter = require("./routes/user-route");
const adminRouter = require("./routes/admin-routes");
require("dotenv").config();
async function main() {
  await mongoose.connect(process.env.MONGO_URL || "");
  app.use("/api/books", bookRouter);
  app.use("/api/orders", orderRouter);
  app.use("/api/auth", userRouter);
  app.use("/api/admin", adminRouter);
  app.get("/", (req, res) => {
    res.send("Hello froom db");
  });
}
main().then(() => console.log("Connected to db"));
app.listen(5000, () => {
  console.log("Hello there");
});
