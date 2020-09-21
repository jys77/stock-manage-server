const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("./config");
const userRoute = require("./routes/userRoute");

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
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(config.PORT, () => {
  console.log(`Server is up on port ${config.PORT}`);
});
