const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const crypto = require("crypto");

const nodemailer = require("nodemailer");

const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

mongoose
  .connect("mongodb+srv://maverick:edd12345@cluster0.aorybxh.mongodb.net/")
  .then(() => {
    console.log("connected to mongo database");
  })
  .catch((error) => {
    console.log("error connecting to mongo database");
  });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
