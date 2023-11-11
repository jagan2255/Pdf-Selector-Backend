const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');

const Users = require('./models/User')
const UsersRefreshToken = require('./models/UserRefreshtoken')



var userRoute = require("./routes/index")


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: true }));


//Database Connection
mongoose
  .connect("mongodb+srv://admin:admin@project1.cfkyt.mongodb.net/Pdfreader", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) 
  .then(() => {
    console.log("DB CONNECTED");
  }).catch((err) => {
    console.error("Error connecting to the database:", err);
  });



var PORT = 3001;


app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});

app.use("/api/v1", userRoute); 



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
