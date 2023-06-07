require("dotenv").config();
const express = require("express");
const authController = require("./controllers/authController");
const conversationsController = require("./controllers/conversationsController");
const messagesController = require("./controllers/messagesController");
const auth = require("./middleware/auth");

const app = express();

app.use(express.json());

// require("./seeders");

app.use(authController);
app.use("/conversations", auth, conversationsController);
app.use("/messages", auth, messagesController);

module.exports = app;