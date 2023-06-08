require("dotenv").config();
const express = require("express");
const cors = require("cors");
const auth = require("./middleware/auth");
const authController = require("./controllers/authController");
const conversationsController = require("./controllers/conversationsController");
const messagesController = require("./controllers/messagesController");
const usersController = require("./controllers/usersController");

const app = express();
app.use(cors({
  origin: '*'
}));

app.use(express.json());

// require("./seeders");

app.use(authController);
app.use("/conversations", auth, conversationsController);
app.use("/messages", auth, messagesController);
app.use("/users", auth, usersController);

module.exports = app;
