require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const app = express();
const PORT = process.env.PORT;
const models = require("./models/models");
const cors = require("cors");
const filesUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandlingMiddleware");
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
// Recipe-generator-database
app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true,  
}));

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static", "avatars")));
app.use(express.static(path.resolve(__dirname, "static", "dishes")));
app.use(filesUpload({}));
app.use(cookieParser());
app.use("/api", router);
app.use(errorHandler);
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
