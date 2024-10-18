const path = require("path");
const express = require("express");
// const morgan = require('morgan');
const methodOverride = require("method-override");
const app = express();
const port = 3001;
const route = require("./routes"); // tự nạp file index
const db = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow all methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specified headers
  })
);
// Connect to DB
db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(methodOverride("_method"));

// Rotes init
route(app);
