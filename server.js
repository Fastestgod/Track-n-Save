const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/transaction_routes");
const authRoutes = require("./routes/auth_routes");
const path = require("path");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use(
  express.static(path.join(__dirname, "public"), { extensions: ["html"] })
);

app.use("/api", routes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB...."))
  .catch((err) => console.log(err));

  app.listen(PORT, () => console.log(`Listening on: ${PORT}`));