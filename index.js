const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const userRoute = require("./routes/userRoute");
const inventoryRoute = require("./routes/inventoryRoute");
const searchRoute = require("./routes/searchRoute");
const historyInRoute = require("./routes/historyInRoute");
const historyOutRoute = require("./routes/historyOutRoute");

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err.reason);
  });

const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/inventories", inventoryRoute);
app.use("/api/search", searchRoute);
app.use("/api/in", historyInRoute);
app.use("/api/out", historyOutRoute);
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(config.PORT, () => {
  console.log(`Server is up on port ${config.PORT}`);
});
