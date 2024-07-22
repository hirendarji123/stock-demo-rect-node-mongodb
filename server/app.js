// server/app.js
const express = require("express");
const mongoose = require("mongoose");
const priceRoutes = require("./routes/prices");
const { fetchPrices } = require("./pollData");
const cors = require("cors");
const app = express();
const PORT = 5000;

mongoose.connect("mongodb://localhost:27017/stock-crypto-tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.use("/api/prices", priceRoutes);

app.listen(PORT, () => {
  // setInterval(fetchPrices, 5000); // Poll every 5 seconds
  console.log(`Server is running on http://localhost:${PORT}`);
});
