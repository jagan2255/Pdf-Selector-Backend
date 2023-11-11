const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

var userRoute = require("./routes/index")


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: true }));


var PORT = 3001;


app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});

app.use("/api/v1", userRoute);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
