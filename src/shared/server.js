require("dotenv").config();
const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const db = require("../config/DBconnection");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, PATCH, DELETE",
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(routes);

db.connect((err) => {
  if (err) {
    console.error(`Failed to connect to the database: ${err}`);
    process.exit(1);
  } else {
    console.log("Successfully connected to the database.");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  }
});
