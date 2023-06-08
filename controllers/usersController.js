const {Router} = require("express");
const app = Router();
const services = require("../application");

app.get("/list", async (req, res, next) => {
  let users;
  try {
    users = await services.users.list();
  } catch (err) {
    next(err);
  }
  return res.send(users);
})

module.exports = app;