const {Router} = require("express");
const app = Router();
const services = require("../application");

app.get("/list", async (req, res) => {
  const {userId} = req.user;
  const {conversationId} = req.body;
  let messages;
  try {
    messages = await services.messages.list({userId, conversationId});
  } catch (err) {
    return res.status(err).send({error: err.message});
  }
  return res.status(200).send({messages})
});

app.post("/send", async (req, res) => {
  const {userId} = req.user;
  const {conversationId, text} = req.body;
  try {
    await services.messages.send({conversationId, userId, text});
  } catch (err) {
    return res.status(err).send({error: err.message});
  }
  return res.status(200).send();
});

module.exports = app;