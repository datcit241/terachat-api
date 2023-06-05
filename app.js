require("dotenv").config();
const express = require("express");
const authController = require("./controllers/authController");

const app = express();

app.use(express.json());

// require("./seeders");

app.use(authController);

module.exports = app;